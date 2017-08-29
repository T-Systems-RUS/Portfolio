import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { BackPanelComponent} from './backpanel/backpanel.component';
import { FooterComponent} from './footer/footer.component';
import { TrimTextDirective }  from './trimtext.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ BackPanelComponent, FooterComponent, TrimTextDirective ],
  exports:      [ CommonModule, FormsModule, BackPanelComponent,FooterComponent, TrimTextDirective ]
})
export class SharedModule { }