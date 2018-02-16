import {Component, OnInit} from '@angular/core';
import {Role} from 'app/shared/models/role';
import {groupBy} from '../../../shared/helpers/extensions';
import {FormBuilder, Validators} from '@angular/forms';
import {AdminService} from '../../admin.service';
import constants from '../../../shared/constants';

@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss', './../admin-form/admin-form.component.scss'],
  animations: []
})
export class AdminRoleComponent implements OnInit {

  activeId = '';
  editMode = false;
  roles: Role[];
  domains: string[];
  seniority: string[];
  // for checkbox
  leadrole = false;
  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    domain: ['', Validators.required],
    seniority: ['', Validators.required],
    leadrole: ['']
  });

  constructor(private fb: FormBuilder,
              private service: AdminService) {
  }

  ngOnInit() {
    this.domains = constants.roles;
    this.seniority = constants.seniority;
    this.service.getRoles().subscribe(data => {
      this.roles = groupBy(data || [], 'domain') as Role[];
      console.log(this.roles);
    });
  }

  setRoleType() {
    this.leadrole = !this.leadrole;
    this.form.patchValue({leadrole: this.leadrole});
  }

  submitForm() {
    console.log(this.form.value);
  }

  setForm(value) {
    this.form.patchValue({
      id: value.id,
      name: value.name,
      leadrole: value.leadrole,
      seniority: value.seniority,
      domain: value.domain
    });
    this.leadrole = value.leadrole;
    this.activeId = value.id;
    this.editMode = true;
  }

  resetForm() {
    this.activeId = '';
    this.form.reset();
    this.editMode = false;
  }

  deleteRole(roleid) {
    console.log(roleid);
  }
}
