// Exact copy of app/title.component.ts except import UserService from shared
import {Component, Input, SimpleChanges, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges {

  @Input() image = '';
  @Input() withSugar = false;
  fullpath;

  ngOnInit() {
    this.changePath(this.image);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.image.currentValue;
    this.changePath(change);
  }

  changePath(path) {
    this.fullpath = path ? `'/server/images/${path}'` : '';
  }
}
