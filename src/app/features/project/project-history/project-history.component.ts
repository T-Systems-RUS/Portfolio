import {Component, Input, ViewChildren, QueryList, ViewChild, ViewContainerRef} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Project} from '../../../shared/models/project';
import {PROJECT_ANIMATION} from '../project/project.animation';
import {ProjectService} from '../project.service';
import {DynamicService} from '../../../core/dynamic.service';

import {ProjectModalComponent} from '../project-modal/project-modal.component';

@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: [
    './project-history.component.less',
    '../project/project.component.less'],
  animations: PROJECT_ANIMATION
})
export class ProjectHistoryComponent {

  @Input() model: Project = new Project();
  @Input() projects: Project[] = [];
  @Input() itemStyle = '';

  versions: number[] = [];

  @ViewChildren(ProjectModalComponent) modals: QueryList<ProjectModalComponent>;
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private dataService: ProjectService,
              private dynamic: DynamicService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.model.name = params['name'];
        this.dataService.getProjectsByName(params['name']).subscribe(data => {
          this.projects = data;
          this.versions = this.projects.map(p => p.version);
          this.model.line = this.projects.length > 0 ? this.projects[0].line : 'grey';
          console.log(this.projects);
        }, error => {
          this.model.line = 'grey';
          this.dynamic.setRootViewContainerRef(this.entry);
          const modal = this.dynamic.addErrorComponent();
          modal.error = error;
        });
      } else {

      }

    }, error => {
      console.log('fuck', error);
    });

  }

  onChange(event, project, project2) {
    const modal = this.modals.filter(i =>
      i.id == project.id)[0];
    const modal2 = this.modals.filter(i =>
      i.id == project2.id)[0];
    console.log(modal.project.id, modal.id, modal2.project.id, modal2.id);
    const aimproject = this.projects.filter(pr => pr.version == event)[0];
    modal.project = aimproject;
    modal.compareProjects(modal.project, modal2.project);
    modal2.compareProjects(modal2.project, modal.project);
  }

}
