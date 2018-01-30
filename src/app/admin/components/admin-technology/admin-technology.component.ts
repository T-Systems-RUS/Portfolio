import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { Technology } from 'app/shared/models/technology';

import { groupBy } from '../../../shared/helpers/extensions';

//forms
import { FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { AdminValidators } from './../../admin.validators';


@Component({
  selector: 'admin-technology',
  templateUrl: './admin-technology.component.html',
  styleUrls:  ['./admin-technology.component.less','./admin-form.component.less'],
  animations: [ ]
})
export class AdminTechnologyComponent implements OnInit {

  technologies:Array<Technology>;
  techNames:Set<string>;
  domains:Array<string>;

  constructor(
    private fb: FormBuilder,
    private service:AdminService
  ) {}


  ngOnInit(){
    this.service.getConstants().subscribe(data=>this.domains=data.technologies);
    this.getTechnologies();
  }

  form=this.fb.group({
    name:['', Validators.required,this.validateTechnology.bind(this) ],
    domain:['', Validators.required ],
    version:['' ],
    image:['',AdminValidators.checkImage]
  } /*, { validator: AdminValidators.checkImage }*/)

  getTechnologies(){
    this.service.getTechnologies().subscribe(data=>{
        this.technologies=groupBy(data || [],'domain');
        this.techNames=new Set(data.map(tech=>tech.name))
        console.log(this.technologies);
    })
  }

  addTechnology(){
    this.service.createTechnology(this.form.value).subscribe(data=>{
      this.form.reset();
      console.log(this.form.value)
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }

  chipClicked(){
    console.log('checked')
  }

  get exists() {
    return (
      this.form.get('name').hasError('alreadyExists') &&
      this.form.get('name').dirty
    );
  }

  get invalid() {
    return (
      this.form.get('image').hasError('invalidImage') &&
      this.form.get('image').dirty
    );
  }

  validateTechnology(control: AbstractControl) {
    return this.service
      .doesTechnologyExist(control.value)
      .map((response: boolean) => response ? { alreadyExists: true } :  null );
  }


  
  deleteTech(id){
    this.service.deleteTechnology(id).subscribe(data=>{
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }
}
