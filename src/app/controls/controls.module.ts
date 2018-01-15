import { NgModule, Optional, SkipSelf }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';

/*Control Components */
import { ButtonComponent } from './button/button.component';
import { CheckBoxComponent } from './checkbox/checkbox.component';
import { InputComponent }  from './input/input.component';
import { DropDownComponent }  from './dropdown/dropdown.component';
import { DeleteButtonComponent }  from './delete/delete.component';
import { ChipComponent }   from './chip/chip.component';

import { FilterItemComponent } from './filters/filter-item/filter-item.component';
import { FilterPanelComponent } from './filters/filter-panel/filter-panel.component';

import { ListItemComponent } from './list/list-item/list-item.component';

import { PanelComponent } from './panel/panel.component';
import { SliderComponent } from './slider/slider.component';

import { FormComponent } from './form/form.component'; 
import { DynamicFormQuestionComponent } from './form/dynamic-question/dynamic-question.component';
import { QuestionControlService } from './form/question-control.service'; 


@NgModule({
  imports:      [ 
     SharedModule
  ],
  declarations: [
    ButtonComponent,
    DeleteButtonComponent,
    CheckBoxComponent,
    ChipComponent,
    InputComponent,
    DropDownComponent,
    FilterItemComponent,
    FilterPanelComponent,
    FormComponent,
    DynamicFormQuestionComponent,
    ListItemComponent,
    PanelComponent,
    SliderComponent
  ],
  exports:      [ 
    ButtonComponent,
    DeleteButtonComponent,
    CheckBoxComponent,
    ChipComponent,
    InputComponent,
    DropDownComponent,
    FilterItemComponent,
    FilterPanelComponent,
    FormComponent,
    DynamicFormQuestionComponent,
    ListItemComponent,
    PanelComponent,
    SliderComponent
  ],
  providers:    [ 
    QuestionControlService
  ]
})
export class ControlsModule {
  constructor (@Optional() @SkipSelf() parentModule: ControlsModule) {
    if (parentModule) {
      throw new Error(
        'ControlsModule is already loaded. Import it in the AppModule only');
    }
  }
}