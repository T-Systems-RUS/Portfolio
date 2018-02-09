// Exact copy of app/title.component.ts except import UserService from shared
import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent {

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
    this.fullpath = path ? '/server/images/' + path : '';
  }
}
