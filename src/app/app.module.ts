import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';

/*Feature Modules */
import {AdminModule} from './admin/admin.module';
import {CoreModule} from './core/core.module';
import {ProjectModule} from './features/project/project.module';
import {EmployeeModule} from './features/employee/employee.module';
import {TechnologyModule} from './features/technology/technology.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CoreModule.forRoot({userName: 'Miss Marple'}),
    EmployeeModule,
    ProjectModule,
    TechnologyModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
