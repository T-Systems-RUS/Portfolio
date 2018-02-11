import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {TechnologyPickerComponent} from '../../technology/technology-picker/technology-picker.component';
import {Project} from '../../../shared/models/project';
import {Technology} from '../../../shared/models/technology';
import {Constants} from '../../../shared/models/constants';

import {ProjectService} from '../project.service';
import {PowerPointService} from '../../../core/powerpoint.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Comparer} from '../../../shared/helpers/comparer';

import * as _ from 'lodash';
/**
 * Page with projects list
 * start page
 * @export
 * @class ProjectListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {

  @Input() projects: Project[] = [];
  // Component in filter
  @ViewChild(TechnologyPickerComponent) technologyPicker: TechnologyPickerComponent;

  // list with autocompletes project names
  // for search input
  complete: string[] = [];

  // initial project list for autocomplete
  initialProjects: Project[] = [];
  // stores property by witch list was sorted
  // visible in filter panel
  sortProperty = '';

  // activate selected technology from query params
  // in technology picker
  selectedTechnology = '';
  // sort order
  isAssending = false;

  // constants
  constants = new Constants();
  // filter checkboxes in filter
  line: string[] = [];
  type: string[] = [];
  program: string[] = [];
  domain: string[] = [];
  customer: string[] = [];
  technologies: Technology[] = [];

  // stores selected filters
  filter = {};

  constructor(private dataService: ProjectService,
              public router: Router,
              private route: ActivatedRoute,
              private powerpoint: PowerPointService) {

  }

  ngOnInit() {
    // used in filter lists of checkboxes
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
      // TODO create set get property on project
      this.projects.forEach(item => item.teamcount = item.schedules.length);

      // customer list for filters
      this.constants.customers = new Set(
        this.projects.map(item => item.customer).filter(p => p !== '' && p).sort()
      );

      console.log(this.projects);

      this.initialProjects = this.projects;
      this.complete = this.refreshCompleteList(this.projects);

      // check if filter needs to apply values from query params
      const params = this.route.snapshot.queryParams;
      if (!_.isEmpty(params)) {
        for (const key of Object.keys(params)) {
          const parameter = params[key];

          // if filter key is technology activate technology in
          // technology picker
          if (key === 'technologies') {
            this.selectedTechnology = parameter;
          }
          // add new item to filter prime ng checkboxes
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
/**
 * Filters projects by input in search field
 * not case-insensitive
 * @param {any} event input from search field
 * @memberof ProjectListComponent
 */
filterProjects(event) {
    this.clearFilters();
    this.projects = this.initialProjects;
    this.projects = this.projects.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) != -1);
    this.complete = this.projects.map(item => item.name);
  }

  newProject() {
    this.router.navigate(['/project/new']);
  }

/**
 * Changes filter object
 * @param {any} $event value from control component
 * @param {any} name property to be set on filter
 * @memberof ProjectListComponent
 */
check($event, name) {
    if (this[name]) {
      if (name === 'technologies') {
        this[name] = $event;
      }
      this.filter[name] = this[name];
      this.complexFilter();
    }
  }
/**
 * Filters project list with properties
 * on filter object
 * @memberof ProjectListComponent
 */
complexFilter() {
    this.projects = this.initialProjects;
    for (const key of Object.keys(this.filter)) {
      this.projects = this.projects.filter(item => {
        if (this.filter[key].length) {
          // filter prop is array
          // compares ids is filter prop arrray with ids on project property array
          if (Array.isArray(item[key])) {
            const ids = Array.isArray(this.filter[key]) ? this.filter[key].map(item => item.id) : [];
            return item[key].map(item => item.id).filter(elem =>
              ids.indexOf(elem) > -1).length === ids.length;
          } else {
            // if filter prop is not array
            // compares filter prop with project property
            return this.filter[key].indexOf(item[key]) > -1;
          }
        } else {
          // if filter is not applied returns initial list
          return item;
        }
      });
    }
    // resfresh autocomplete list after filtering
    this.complete = this.refreshCompleteList(this.projects);
  }

/**
 * Resets all filter objects
 * Resets project list to initial state
 * Deselect selected technologies in technology picker
 * @memberof ProjectListComponent
 */
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
      // saveToClient true to download presentation after last slide finished
      const saveToClient = i === this.projects.length - 1 ? true : false;
      this.powerpoint.createPresentation(this.projects[i], presentationname, saveToClient);
    }
  }
}
