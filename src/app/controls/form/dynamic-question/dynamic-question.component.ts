import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionBase} from '../question-base';

@Component({
  selector: 'df-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.scss']
})

export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<{}>;
  @Input() form: FormGroup;
  @Input() id = '';

  @Input() label = '';
  @Input() wrapperStyle = '';
  @Input() placeholder = '';
  @Input() labelStyle = '';

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
