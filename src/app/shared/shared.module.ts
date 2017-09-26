import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule }         from '@angular/forms';

import {GrowlModule}           from 'primeng/primeng';
import {CalendarModule}        from 'primeng/primeng';

import { BackPanelComponent} from './backpanel/backpanel.component';
import { FooterComponent} from './footer/footer.component';
import { ModalComponent} from './modal/modal.component';
import { TrimTextDirective }  from './trimtext.directive';

@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule,GrowlModule, CalendarModule ],
  declarations: [ BackPanelComponent, FooterComponent, ModalComponent, TrimTextDirective ],
  exports:      [ CommonModule,GrowlModule, CalendarModule, FormsModule, BackPanelComponent,FooterComponent, ModalComponent, TrimTextDirective ]
})
export class SharedModule { }