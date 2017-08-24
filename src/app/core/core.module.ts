/* tslint:disable:member-ordering no-unused-variable */
import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';
  
  import { SharedModule }      from '../shared/shared.module';
  import { UserService }       from './user.service';
  import { UserServiceConfig } from './user.service';

  /*Feature Modules */

  import { HeaderComponent }   from './header/header.component';
  import { LoaderComponent }   from './loader/loader.component';

  
  @NgModule({
    imports:      [ 
      SharedModule 
    ],
    declarations: [
      HeaderComponent,
      LoaderComponent
    ],
    exports:      [ 
      HeaderComponent,
      LoaderComponent
    ],
    providers:    [ 
      UserService
    ]
  })
  export class CoreModule {
  
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }
  
    static forRoot(config: UserServiceConfig): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [
          { provide: UserServiceConfig, useValue: config }
        ]
      };
    }
  }
  