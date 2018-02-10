import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: [
    './chip.component.scss'
  ]
})
export class ChipComponent implements OnInit {

  @Input() value = '';
  @Input() style = '';
  @Input() clickable = false;
  @Input() isLink = false;

  @Output() clicked = new EventEmitter<string>();
  @Output() linkClicked = new EventEmitter<string>();

  @Input() active = false;
  @Input() image = '';
  @Input() path = '/server/images/presentation/';

  fullpath;

  ngOnInit() {
    this.fullpath = this.path + this.image;
  }

  performClick(value) {
    if (this.clickable) {
      this.active = !this.active;
      this.clicked.emit(value);
    } else {
      if (this.isLink) {
        this.linkClicked.emit(value);
      }
    }
  }

}
