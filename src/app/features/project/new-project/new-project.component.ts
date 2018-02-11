// angular
import {Component, Input, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

// models
import {Project} from '../../../shared/models/project';

// Services
import {ProjectService} from '../project.service';
import {DynamicService} from '../../../core/dynamic.service';

// primeng and third libraries
import {Message} from 'primeng/components/common/api';
import {Comparer} from '../../../shared/helpers/comparer';
/**
 * One form for create and update
 * @export
 * @class NewProjectComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  @Input()
  model: Project = new Project();
  // initila state of model. Compared with in order to
  // enable/disable submit button
  modelCopy: Project = new Project();

  // Entry point for dynamic components
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

  // for primeng Growl
  msgs: Message[] = [];
  // change style of prime ng calender for startdate
  styleClass = '';
  // set to true when project update
  editMode = false;

  // properties for dropdowns
  // loads from constants.json
  // TO DO - change json structure add parents/child
  lines: string[];
  domains: string[];
  types: string[];
  programs: string[];
  // disable submit button
  disabled = true;
  // for adding error class when fields required
  errors: Object = {};

  constructor(private dataService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private dynamic: DynamicService) {
  }

  ngOnInit() {

    this.dataService.getConstants().subscribe(res => {
      this.lines = res.lines;
      this.domains = res.domains;
      this.types = res.types;
      this.programs = res.programs;
    }, error => {
      console.log(error);
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.dataService.getProject(params['id']).subscribe(data => {
          this.model = new Project(data);
          // detect changes for submit button disabled

          // if no date must be undefined or calendar breaks prime ng
          this.model.startdate = this.model.startdate ? new Date(this.model.startdate) : undefined;
          this.model.enddate = this.model.enddate ? new Date(this.model.enddate) : undefined;

          this.modelCopy = new Project(this.model);
          // check if create or update by url segment
          const urlSegment = this.route.snapshot.url[1].path;
          this.editMode = urlSegment === 'update' ? true : false;

        }, error => {
          // dynamically creates error component
          this.dynamic.setRootViewContainerRef(this.entry);
          const modal = this.dynamic.addErrorComponent();
          modal.error = error;
          modal.action = true;
          // For redirection to project list from error modal
          // Button redirect to newest version
          modal.actionPerfomed.subscribe(action => {
            this.router.navigate(['/projects/']);
          });
        });
      } else {
        this.editMode = false;
      }

    }, error => {
      console.log(error);
    });

  }
/**
 * Create or update Project
 * depending on editMode prop
 * @memberof NewProjectComponent
 */
changeProject() {
    // reset all errors classes on conrols
    this.model.errors = {};
    const unvalidFields = this.unvalidFields();

    if (unvalidFields.length > 0) {
      this.model.generateErrors(unvalidFields);

      // error style for prime ng calender
      this.styleClass = unvalidFields.filter(field => field === 'startdate').length > 0
        ? 'ui-inputtext--error'
        : '';
      // calls prime ng error growl
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Please fill required fields'});
    } else {
      this.model.pss = parseFloat(this.model.pss.toString().replace(',', '.')) || 0;

      if (this.editMode) {
        // increase version for backend
        this.model.version = this.model.version + 1;
        this.dataService.updateProject(this.model).subscribe(
          data => {
            this.router.navigate(['/project/', data.id]);
            console.log(data);
          },
          error => {
            this.dynamic.setRootViewContainerRef(this.entry);
            const modal = this.dynamic.addErrorComponent();
            modal.error = error;
            console.log(error);
            modal.action = true;
            modal.actionPerfomed.subscribe(action => {
              this.router.navigate(['/projects/']);
            });
          }
        );
      } else {
        // reset version for create copy functionality
        this.model.version = 1;
        this.dataService.createProject(this.model).subscribe(
          data => {
            this.router.navigate(['/projects/']);
          },
          error => {
            this.dynamic.setRootViewContainerRef(this.entry);
            const modal = this.dynamic.addErrorComponent();
            modal.error = error;
          }
        );
      }
    }
  }
/**
 * Show overview dialog
 * before submit project
 * @memberof NewProjectComponent
 */
showPreview() {
    this.dynamic.setRootViewContainerRef(this.entry);
    const modal = this.dynamic.addProjectConfirmationComponent();
    modal.project = new Project(this.model);
  }
/**
 * Updates model from controls components
 * inputs, dropdowns, tech-picker, employee-picker
 * @param {any} value new value
 * @param {any} prop prop on model to be changed
 * @memberof NewProjectComponent
 */
setValue(value, prop) {
    this.model[prop] = value;
    // check for changes to enable submit
    this.disableSubmit();
    // console.log(this.model);
  }
/**
 * Checks model required prop on model
 * @returns array of empty required fileds
 * @memberof NewProjectComponent
 */
unvalidFields() {
    return this.model.required.map(key =>
      !this.model[key] ? key : '').filter(item => item !== '');
  }
/**
 * Change color of header
 * depending on production line
 * @param {any} event name of chosen production line
 * @memberof NewProjectComponent
 */
  changeLine(event) {
    this.model.line = event;
  }

  back() {
    window.history.back();
  }
/**
 * check difference between model and modelCopy
 * no difference - > disable submit
 * @memberof NewProjectComponent
 */
disableSubmit() {
    const comparer = new Comparer();
    const diff = comparer.deepCompare(this.model, this.modelCopy);
    this.disabled = Object.keys(diff).length === 0;
  }

}
