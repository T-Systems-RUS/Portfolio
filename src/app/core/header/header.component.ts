// Exact copy of app/title.component.ts except import UserService from shared
import { Component, Input } from '@angular/core';
import { UserService }      from '../user.service';
import { HEADER_ANIMATION } from './header.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:  ['./header.component.less'],
  animations: [ HEADER_ANIMATION]
})
export class HeaderComponent {
  user = '';

  constructor(userService: UserService) {
    this.user = userService.userName;
  }
}

