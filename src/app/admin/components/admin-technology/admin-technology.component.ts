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
  styleUrls:  ['./admin-technology.component.less','./../admin-form/admin-form.component.less'],
  animations: [ ]
})
export class AdminTechnologyComponent implements OnInit {

  technologies:Array<Technology>;
  techNames:Set<string>;
  domains:Array<string>;
  editMode:boolean=false;

  constructor(
    private fb: FormBuilder,
    private service:AdminService
  ) {}


  ngOnInit(){
    this.service.getConstants().subscribe(data=>this.domains=data.technologies);
    this.getTechnologies();
  }

  form=this.fb.group({
    id:[''],
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

updateTechnology(){
    this.service.updateTechnology(this.form.value).subscribe(data=>{
      this.form.reset();
      console.log(this.form.value);
      this.editMode=false;
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }

  submitForm(){
    this.editMode ? this.updateTechnology() : this.addTechnology();
  }

  setForm(value){
    this.form.patchValue({
      id:value.id,
      name:value.name,
      image:value.image,
      version:value.version,
      domain:value.domain
    });

    this.editMode=true;

    console.log(this.form.value);
  }

  resetForm(){
    this.form.reset();
    this.editMode=false;
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
      let id=this.form.get('id').value;

      return this.service
        .doesTechnologyExist(control.value,id)
        .map((response: boolean) => 
                 response  ? { alreadyExists: true } :  null );
  }


  
  deleteTech(id,$event){
    $event.stopPropagation();
    
    this.service.deleteTechnology(id).subscribe(data=>{
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }
}
