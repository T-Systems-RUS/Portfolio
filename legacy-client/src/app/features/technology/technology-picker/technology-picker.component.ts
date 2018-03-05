import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Technology} from '../../../shared/models/technology';
import {TechnologyService} from '../technology.service';

/**
 * Component for filtering and Technology selection
 * Used in create/update project and project list filter
 * @export
 * @class TechnologyPickerComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'technology-picker',
  templateUrl: './technology-picker.component.html',
  styleUrls: ['./technology-picker.component.scss'],
})

export class TechnologyPickerComponent implements OnInit {

  // mark technologies as active
  @Input() selectedTechnologies: Technology[] = [];
  // style picker with external classes
  @Input() pickerStyle = '';
  @Input() searchStyle = '';
  @Input() clearStyle = '';
  @Input() selectStyle = '';
  // for selecting/deselecting all technologies
  allSelected: boolean;

  // set one active technology for project list filter
  // from query params
  @Input()
  public set selected(val: string) {
    this.selectedTechnologies = [...this.selectedTechnologies, new Technology({name: val})];
    this.initialFilter();
  }

  @Output() onSelect = new EventEmitter<Technology[]>();

  // stores initial technology list for filter reset
  initialTechnologies: Technology[] = [];
  technologies: Technology[] = [];

  constructor(private dataService: TechnologyService) {

  }

  ngOnInit() {
    this.dataService.getTechnologies().subscribe(data => {
      this.technologies = data;
      this.initialFilter();

      this.initialTechnologies = this.technologies;
    }, error => {
      console.log(error);
    });
  }

  /**
   * If project has technologies
   * it will be activated in picker
   * @memberof TechnologyPickerComponent
   */
  initialFilter() {
    this.technologies.filter(item =>
      this.selectedTechnologies.map(i => i.name)
        .includes(item.name)).forEach(element => {
      element.active = true;
    });

    const selected = this.technologies.filter(item => item.active);
    // if one active technology in project button is deselect all
    this.allSelected = selected.length ? true : false;
    console.log(this.allSelected);
    this.onSelect.emit(selected);
  }

  filterTechnologies(event) {
    this.technologies = this.initialTechnologies;
    this.technologies = this.technologies.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) !== -1);
  }

  selectTechnology(event) {
    // keeps tech active if filtering is applied modifies initial list
    const tech = this.initialTechnologies.filter(item => item.name === event)[0];
    tech.active = !tech.active;

    const selected = this.technologies.filter(item => item.active);
    this.onSelect.emit(selected);
  }

  clearSelect() {
    this.technologies.forEach(tech => tech.active = false);
  }

  /**
   * Select/Deselect
   * all technologies in picker
   * @memberof TechnologyPickerComponent
   */
  switchAll() {
    this.allSelected = !this.allSelected;
    this.technologies.forEach(tech => tech.active = this.allSelected);

    this.allSelected ? this.onSelect.emit(this.technologies)
      : this.onSelect.emit([]);

  }

}
