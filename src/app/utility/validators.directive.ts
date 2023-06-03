import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const validPassword = passwordRegex.test(control.value);
    return validPassword ? null : { passwordMismatch: true };
  };
}

export function confirmPasswordValidator(password: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = /^[a-zA-Z'-]+\s[a-zA-Z'-]+$/
    const validConfirmPassword = control.value === password
    return validConfirmPassword ? null : {invalidConfirmPassword: true};
  }
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const validEmail = emailRegex.test(control.value);
    return validEmail ? null : { invalidEmail: true };
  };
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = /^[a-zA-Z'-]+\s[a-zA-Z'-]+$/
    const validFullName = regex.test(control.value);
    return validFullName ? null : {invalidFullName: true};
  }
}
