import {Component, Input, EventEmitter, Output, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'(document:click)': 'onClick($event)'}
})

export class FilterItemComponent {

  @Input() name = '';
  @Input() withTooltip = false;
  @Input() tooltipVisible = false;
  @Input() filterStyle = '';
  @Input() tooltipStyle = '';
  @Input() wrapperStyle = '';

  @Output() onFilterAction = new EventEmitter<string>();

  constructor(private _eref: ElementRef) {
  }

  filterClick(type: string) {
    this.onFilterAction.emit(this.name);
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.tooltipVisible = false;
    }
  }

}
