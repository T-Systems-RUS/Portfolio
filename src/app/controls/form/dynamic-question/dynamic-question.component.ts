import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from './../question-base';


@Component({
  selector: 'df-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls:  [
      './dynamic-question.component.less'
    ]
})

export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    @Input() id:string="";

    @Input() label:string='';
    @Input() wrapperStyle='';
    @Input() placeholder:string='';
    @Input() labelStyle='';

    ngOnInit(){
      console.log(this.form,this.form.controls[this.question.key])
    }

    get isValid() { return this.form.controls[this.question.key].valid; }
  }