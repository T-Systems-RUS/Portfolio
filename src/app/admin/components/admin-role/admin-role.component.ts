import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { Role } from 'app/shared/models/role';

import { groupBy } from '../../../shared/helpers/extensions';

//forms
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls:  ['./admin-role.component.less'],
  animations: [ ]
})
export class AdminRoleComponent implements OnInit{

    roles:Array<Role>;
    domains:Array<string>;

    constructor(
      private fb: FormBuilder,
      private service:AdminService
    ) {}

    ngOnInit(){
        this.service.getConstants().subscribe(data=>this.domains=data.roles);
        this.service.getRoles().subscribe(data=>{
            this.roles=groupBy(data || [],'domain');
            console.log(this.roles);
        })
    } 

    form=this.fb.group({

    })

    addRole($event){
      console.log($event);
    }

    deleteRole(roleid){
      console.log(roleid);
    }
}
