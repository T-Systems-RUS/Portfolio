import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { Technology } from 'app/shared/models/technology';

import { groupBy } from '../../../shared/helpers/extensions';

//forms
import { FormBuilder,Validators } from '@angular/forms';
import { AdminValidators } from './../../admin.validators';


@Component({
  selector: 'admin-technology',
  templateUrl: './admin-technology.component.html',
  styleUrls:  ['./admin-technology.component.less'],
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
    name:['', Validators.required ],
    domain:['', Validators.required ],
    version:['' ]
  }, { validator: AdminValidators.versionRequired })

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
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }

  checkSelectedTechnologies(){
    console.log('checked')
  }


  
  deleteTech(id){
    this.service.deleteTechnology(id).subscribe(data=>{
      this.getTechnologies();
    },error=>{
      console.log(error);
    })
  }
}
