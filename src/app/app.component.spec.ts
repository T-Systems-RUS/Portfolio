import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from './core/user.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UserService, useValue: {}},],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
