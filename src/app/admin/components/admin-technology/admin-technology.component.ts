import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { Technology } from 'app/shared/models/technology';

import { groupBy } from '../../../shared/helpers/extensions';

//forms
import { FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'admin-technology',
  templateUrl: './admin-technology.component.html',
  styleUrls:  ['./admin-technology.component.less'],
  animations: [ ]
})
export class AdminTechnologyComponent implements OnInit {

  technologies:Array<Technology>;
  domains:Array<string>;

  constructor(
    private fb: FormBuilder,
    private service:AdminService
  ) {}


  ngOnInit(){
    this.service.getConstants().subscribe(data=>this.domains=data.technologies);
    this.service.getTechnologies().subscribe(data=>{
        this.technologies=groupBy(data || [],'domain');
        console.log(this.technologies);
    })
  }

  form=this.fb.group({
    name:['', Validators.required],
    domain:['', Validators.required],
    version:['']
  })

  addRole(event){
    console.log(this.form.value,event);
  }
  
  deleteTech(id){
    console.log(id);
  }
}
