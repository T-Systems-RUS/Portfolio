import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls:  [
      './form.component.less'
    ]
})

export class FormComponent implements OnInit {
    
     @Input() questions: QuestionBase<any>[] = [];
     form: FormGroup;
     payLoad = '';
    
     constructor(private qcs: QuestionControlService) {  }
    
     ngOnInit() {
       this.form = this.qcs.toFormGroup(this.questions);
     }
    
     onSubmit() {
         console.log(this.form.value);
       //this.payLoad = JSON.stringify(this.form.value);
     }
}