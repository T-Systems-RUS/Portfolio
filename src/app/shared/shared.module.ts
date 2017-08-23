import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { BackPanelComponent} from './backpanel/backpanel.component';
import { TrimTextDirective }  from './trimtext.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ BackPanelComponent, TrimTextDirective ],
  exports:      [ CommonModule, FormsModule, BackPanelComponent, TrimTextDirective ]
})
export class SharedModule { }