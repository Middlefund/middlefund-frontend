import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const validPassword = passwordRegex.test(control.value);
    return validPassword ? null : { passwordMismatch: true };
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const validEmail = emailRegex.test(control.value);
    return validEmail ? null : { invalidEmail: true };
  };
}
