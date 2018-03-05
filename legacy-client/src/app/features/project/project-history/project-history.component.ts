import {Component, Input, ViewChildren, QueryList, ViewChild, ViewContainerRef, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Project} from '../../../shared/models/project';
import {ProjectService} from '../project.service';
import {DynamicService} from '../../../core/dynamic.service';

import {ProjectModalComponent} from '../project-modal/project-modal.component';

/**
 * Compares all versions of project
 * grouped under same name
 * @export
 * @class ProjectHistoryComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: [
    './project-history.component.scss',
    '../project/project.component.scss']
})
export class ProjectHistoryComponent implements OnInit {

  // stores common values of all projects
  // name for header backpanel color - production line
  @Input() model: Project = new Project();
  @Input() projects: Project[] = [];

  // list of versions for filter dropdown
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
          // set grey background for backpanel
          // if project's not found
          this.model.line = 'grey';
          this.dynamic.setRootViewContainerRef(this.entry);
          const modal = this.dynamic.addErrorComponent();
          modal.error = error;
        });
      }

    }, error => {
      console.log(error);
    });

  }
/**
 * Compares left panel with selected
 * from dropdown version
 * @param {any} event selected version
 * @param {any} project left project in panel
 * @param {any} project2 right project
 * @memberof ProjectHistoryComponent
 */
onChange(event, project, project2) {
    // choose panel with selected project
    const modal = this.modals.filter(i =>
      i.id === project.id)[0];
    const modal2 = this.modals.filter(i =>
      i.id === project2.id)[0];
    const aimproject = this.projects.filter(pr => pr.version === event)[0];
    // set project to compare with
    // reset control colors
    modal.project = aimproject;
    modal.compareProjects(modal.project, modal2.project);
    modal2.compareProjects(modal2.project, modal.project);
  }

}
