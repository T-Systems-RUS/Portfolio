// Exact copy of app/title.component.ts except import UserService from shared
import { Component, Input } from '@angular/core';


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls:  ['./slider.component.less']
})
export class SliderComponent {

@Input() image:string=""
  constructor() {

  }

  ngOnInit(){
    this.image=this.image ? "/server/images/"+this.image : "";
    console.log(this.image);
  }
}

