import { AbstractControl, ValidationErrors } from '@angular/forms';

export function stPasswordValidator(control: AbstractControl): ValidationErrors | null {

  let hasError = null;

  if(control.parent) {
    // not that we do not set error if empty
    // this is because when reloading data, the parent value password is set to null and then differs from the repeat field
    if (control.value) {
      hasError = control.value !== control.parent.value.password;
    }
  }

  return hasError ? {stPasswordValidator: true} : null;
}