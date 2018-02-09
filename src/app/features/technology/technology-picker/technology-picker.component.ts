import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Technology} from '../../../shared/models/technology';
import {TechnologyService} from '../technology.service';

@Component({
  selector: 'technology-picker',
  templateUrl: './technology-picker.component.html',
  styleUrls: ['./technology-picker.component.less'],
})
export class TechnologyPickerComponent {

  @Input() selectedTechnologies: Technology[] = [];
  @Input() pickerStyle = '';
  @Input() searchStyle = '';
  @Input() clearStyle = '';
  @Input() selectStyle = '';

  allSelected: boolean;

  @Input()
  public set selected(val: string) {
    this.selectedTechnologies = [...this.selectedTechnologies, new Technology({name: val})];
    this.initialFilter();
  }

  @Output() onSelect = new EventEmitter<Technology[]>();

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

  initialFilter() {
    this.technologies.filter(item =>
      this.selectedTechnologies.map(i => i.name)
        .includes(item.name)).forEach(element => {
      element.active = true;
    });

    const selected = this.technologies.filter(item => item.active);
    this.allSelected = selected.length ? true : false;
    console.log(this.allSelected);
    this.onSelect.emit(selected);
  }

  filterTechnologies(event) {

    this.technologies = this.initialTechnologies;
    this.technologies = this.technologies.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) != -1);
  }

  selectTechnology(event) {
    const tech = this.initialTechnologies.filter(item => item.name === event)[0];
    tech.active = !tech.active;

    const selected = this.technologies.filter(item => item.active);
    this.onSelect.emit(selected);
  }

  clearSelect() {
    this.technologies.forEach(tech => tech.active = false);
  }

  switchAll(allSelected) {
    this.allSelected = !this.allSelected;
    this.technologies.forEach(tech => tech.active = this.allSelected);

    this.allSelected ? this.onSelect.emit(this.technologies)
      : this.onSelect.emit([]);

  }

}
