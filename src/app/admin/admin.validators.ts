import { AbstractControl } from '@angular/forms';

export class AdminValidators {

  static versionRequired(control: AbstractControl) {
    const domain = control.get('domain');
    const version = control.get('version');
    console.log(version)
    const required= (domain.value==='frontend' || domain.value==='backend');

    return required ? { versionRequired: true } : null;

  }
}