import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {GrowlModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';

import {BackPanelComponent} from './backpanel/backpanel.component';
import {FooterComponent} from './footer/footer.component';
import {ModalComponent} from './modal/modal.component';
import {ErrorComponent} from './modal/error/error.component';
import {DeleteComponent} from './modal/delete/delete.component';
import {FileComponent} from './modal/file/file.component';
import {RibbonComponent} from './ribbon/ribbon.component';
import {TrimTextDirective} from './trimtext.directive';
import {FileSizePipe} from './filesize.pipe';
import {KeysPipe} from './keys.pipe';
import {DashPipe} from './dash.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, GrowlModule, CalendarModule, FileUploadModule, CheckboxModule, TooltipModule],
  declarations: [BackPanelComponent, ErrorComponent, DashPipe, DeleteComponent, FileComponent, FileSizePipe, FooterComponent,
    KeysPipe, ModalComponent, RibbonComponent, TrimTextDirective],
  exports: [CommonModule, ErrorComponent, DeleteComponent, FileComponent, DashPipe, FileSizePipe, FileUploadModule, KeysPipe,
    CheckboxModule, GrowlModule, CalendarModule, TooltipModule, FormsModule, ReactiveFormsModule, BackPanelComponent, FooterComponent,
    RibbonComponent, ModalComponent, TrimTextDirective],
  entryComponents: [ErrorComponent, DeleteComponent, FileComponent]
})
export class SharedModule {
}