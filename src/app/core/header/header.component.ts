// Exact copy of app/title.component.ts except import UserService from shared
import {Component} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = '';

  constructor(userService: UserService) {
    this.user = userService.userName;
  }
}
