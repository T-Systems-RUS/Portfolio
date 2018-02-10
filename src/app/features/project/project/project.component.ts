import {Component, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Project} from '../../../shared/models/project';
import {Technology} from '../../../shared/models/technology';

import {DynamicService} from '../../../core/dynamic.service';
import {PowerPointService} from '../../../core/powerpoint.service';
import {ProjectService} from '../project.service';

import {groupBy} from '../../../shared/helpers/extensions';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  model: Project = new Project();
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

  id: number;
  technologies;
  leadContacts;

  ribbonVisible = false;

  constructor(private dataService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private dynamic: DynamicService,
              private powerpoint: PowerPointService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.dataService.getProject(this.id).subscribe(data => {
        this.model = new Project(data);
        this.technologies = groupBy(this.model.technologies, 'domain');
        if (this.model.pss) {
          this.technologies.information = this.technologies.information
            ? [...this.technologies.information, new Technology({name: `'PSS ${this.model.pss}'`})]
            : [new Technology({name: `'PSS ${this.model.pss}'`})];
        }

        this.leadContacts = this.model.schedules.filter(schedule => schedule.role.leadrole);

        if (this.model.enddate) {
          this.ribbonVisible = new Date(this.model.enddate) <= new Date();
        }

        console.log(this.model);
      }, error => {
        this.dynamic.setRootViewContainerRef(this.entry);
        const modal = this.dynamic.addErrorComponent();
        modal.error = error;
        modal.action = true;
        modal.actionPerfomed.subscribe(action => {
          this.router.navigate(['/projects/']);
        });

        this.model.line = 'grey';
      });
    });

  }

  archieveProject() {
    this.dynamic.setRootViewContainerRef(this.entry);
    const modal = this.dynamic.addDeleteComponent();
    modal.type = 'Project';
    modal.name = this.model.name;

    modal.deleted.subscribe(action => {
      modal.visible = false;
      this.dataService.deleteProject(this.model).subscribe(
        data => {
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
          this.dynamic.setRootViewContainerRef(this.entry);
          const modal = this.dynamic.addErrorComponent();
          modal.error.errors = [error];
        }
      );
    });

    modal.archieved.subscribe(action => {
      modal.visible = false;
      this.dataService.archieveProject(this.model).subscribe(
        data => {
          this.router.navigate(['/projects']);
        },
        error => {
          this.dynamic.setRootViewContainerRef(this.entry);
          const modal = this.dynamic.addErrorComponent();
          modal.error.errors = [error];
        }
      );
    });
  }

  showUpload() {
    this.dynamic.setRootViewContainerRef(this.entry);
    const modal = this.dynamic.addFileComponent();
    modal.project = this.model;

    modal.onUploaded.subscribe(image => {
      this.model.image = image;
      console.log(this.model.image);
      modal.visible = false;
    });

    modal.onErrors.subscribe(error => {
      this.dynamic.setRootViewContainerRef(this.entry);
      const modal = this.dynamic.addErrorComponent();
      modal.error = error;
    });
  }

  createPresentation() {
    try {
      this.powerpoint.createPresentation(this.model, this.model.name, true);
    } catch (error) {
      this.dynamic.setRootViewContainerRef(this.entry);
      const modal = this.dynamic.addErrorComponent();
      modal.error.errors = [error];
    }
  }

  searchProjects(name, value) {
    const param = new Object();
    param[name] = value;
    this.router.navigate(['/projects'], {queryParams: param});
  }
}
