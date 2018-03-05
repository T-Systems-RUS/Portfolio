import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf
} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {UserService} from './user.service';
import {UserServiceConfig} from './user.service';

import {HeaderComponent} from './header/header.component';
import {LoaderComponent} from './loader/loader.component';

import {HttpClientService} from './http-client.service';
import {DynamicService} from './dynamic.service';
import {ExtractService} from './extract.service';
import {FileService} from './file.service';
import {PowerPointService} from './powerpoint.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/throw';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  exports: [
    HeaderComponent,
    LoaderComponent
  ],
  providers: [
    DynamicService,
    UserService,
    ExtractService,
    FileService,
    PowerPointService,
    HttpClientService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: UserServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: UserServiceConfig, useValue: config}
      ]
    };
  }
}
