import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { Role } from 'app/shared/models/role';

import { groupBy } from '../../../shared/helpers/extensions';

//forms
import { FormBuilder, Validators } from '@angular/forms';
import { AdminValidators } from './../../admin.validators';

@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls:  ['./admin-role.component.less','./../admin-form/admin-form.component.less'],
  animations: [ ]
})
export class AdminRoleComponent implements OnInit{

    activeId:string="";
    editMode:boolean=false;
    roles:Array<Role>;
    domains:Array<string>;
    seniority:Array<string>;
    //for checkbox
    leadrole:boolean=false;

    constructor(
      private fb: FormBuilder,
      private service:AdminService
    ) {}

    ngOnInit(){
        this.service.getConstants().subscribe(data=>{
          this.domains=data.roles;
          this.seniority=data.seniority;
        });
        this.service.getRoles().subscribe(data=>{
            this.roles=groupBy(data || [],'domain');
            console.log(this.roles);
        })
    } 

    form=this.fb.group({
      id:[''],
      name:['', Validators.required],
      domain:['', Validators.required ],
      seniority:['',Validators.required],
      leadrole:['']
    } /*, { validator: AdminValidators.checkImage }*/)

    

    setRoleType(){
      this.leadrole=!this.leadrole;
      this.form.patchValue({leadrole:this.leadrole });
    }

    submitForm(){
      console.log(this.form.value);
    }

    addRole($event){
      console.log($event);
    }

    setForm(value){
      this.form.patchValue({
        id:value.id,
        name:value.name,
        leadrole:value.leadrole,
        seniority:value.seniority,
        domain:value.domain
      });
      this.leadrole=value.leadrole;
      this.activeId=value.id;
      this.editMode=true;
    }

    resetForm(){
      this.activeId="";
      this.form.reset();
      this.editMode=false;
    }

    deleteRole(roleid){
      console.log(roleid);
    }
}
