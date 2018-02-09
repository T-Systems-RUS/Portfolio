import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {TechnologyPickerComponent} from '../../technology/technology-picker/technology-picker.component';
import {Project} from '../../../shared/models/project';
import {Technology} from '../../../shared/models/technology';
import {Constants} from '../../../shared/models/constants';

import {ProjectService} from '../project.service';
import {PowerPointService} from '../../../core/powerpoint.service';
import {LIST_ANIMATION} from './project-list.animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Comparer} from '../../../shared/helpers/comparer';

import * as _ from 'lodash';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
  animations: LIST_ANIMATION
})

export class ProjectListComponent implements OnInit {

  @Input() projects: Project[] = [];
  @Input() sortOrder = true;
  @ViewChild(TechnologyPickerComponent) technologyPicker: TechnologyPickerComponent;

  complete: string[] = [];

  // initial project list
  initialProjects: Project[] = [];
  sortProperty = '';
  selectedTechnology = '';
  isAssending = false;

  // constants
  constants = new Constants();
  // filter checkboxes
  line: string[] = [];
  type: string[] = [];
  program: string[] = [];
  domain: string[] = [];
  customer: string[] = [];
  technologies: Technology[] = [];

  filter = {};

  constructor(private dataService: ProjectService,
              public router: Router,
              private route: ActivatedRoute,
              private powerpoint: PowerPointService) {

  }

  ngOnInit() {
    this.dataService.getConstants().subscribe(res => {
      this.constants.lines = res.lines;
      this.constants.domains = res.domains;
      this.constants.types = res.types;
      this.constants.programs = res.programs;
    }, error => {
      console.log(error);
    });

    this.dataService.getProjects().subscribe(data => {
      this.projects = data;
      this.projects.forEach(item => item.teamcount = item.schedules.length);

      // cutomer list for filters
      this.constants.customers = new Set(
        this.projects.map(item => item.customer).filter(p => p !== '' && p).sort()
      );

      console.log(this.projects);

      this.initialProjects = this.projects;
      this.complete = this.refreshCompleteList(this.projects);
      // check if filter needs to apply
      const params = this.route.snapshot.queryParams;
      if (!_.isEmpty(params)) {
        for (const key of Object.keys(params)) {
          const parameter = params[key];
          if (key === 'technologies') {
            this.selectedTechnology = parameter;
          }
          this[key] = [...this[key], parameter];
          this.check(parameter, key);
        }
      }

    }, err => {
      console.log(err);
    });
  }

  sortProjects(event) {
    this.isAssending = !this.isAssending;
    this.projects.sort(Comparer.propCompare(event, this.isAssending));
    this.sortProperty = event;
  }

  filterProjects(event) {
    this.clearFilters();
    this.projects = this.initialProjects;
    this.projects = this.projects.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) != -1);
    this.complete = this.projects.map(item => item.name);
  }

  newProject() {
    this.router.navigate(['/project/new']);
  }

  check($event, name) {
    if (this[name]) {
      if (name === 'technologies') {
        this[name] = $event;
      }
      this.filter[name] = this[name];
      this.complexFilter();
    }
  }

  complexFilter() {
    this.projects = this.initialProjects;
    for (const key of Object.keys(this.filter)) {
      this.projects = this.projects.filter(item => {
        if (this.filter[key].length) {

          if (Array.isArray(item[key])) {
            const ids = Array.isArray(this.filter[key]) ? this.filter[key].map(item => item.id) : [];
            return item[key].map(item => item.id).filter(elem =>
              ids.indexOf(elem) > -1).length == ids.length;
          } else {
            return this.filter[key].indexOf(item[key]) > -1;
          }
        } else {
          return item;
        }
      });
    }
    this.complete = this.refreshCompleteList(this.projects);
  }

  clearFilters() {
    this.line = [];
    this.type = [];
    this.program = [];
    this.domain = [];
    this.technologies = [];
    this.customer = [];
    this.filter = new Object();
    this.projects = this.initialProjects;
    this.technologyPicker.clearSelect();
    this.complete = this.refreshCompleteList(this.projects);
  }

  refreshCompleteList(projects): any[] {
    return Array.from(new Set(projects.map(item => item.name)));
  }

  createPresentation() {

    const presentationname = '';

    for (let i = 0; i < this.projects.length; i++) {
      const saveToClient = i === this.projects.length - 1 ? true : false;
      this.powerpoint.createPresentation(this.projects[i], presentationname, saveToClient);
    }
  }
}
