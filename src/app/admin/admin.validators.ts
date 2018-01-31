import { AbstractControl } from '@angular/forms';

export class AdminValidators {

  static checkImage(control: AbstractControl) {
    const valid =control.value ? control.value.endsWith('.png') : true;
    return valid ? null : { invalidImage: true };
  }

  static versionRequired(control: AbstractControl) {
    const domain = control.get('domain');
    const version = control.get('version');

    const required= (domain.value==='frontend' || domain.value==='backend') && !version.value;

    return required ? { versionRequired: true } : null;

  }
}