import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase: boolean = /[A-Z]+/.test(value);
    const hasLowerCase: boolean = /[a-z]+/.test(value);
    const hasNumeric: boolean = /[0-9]+/.test(value);
    const passwordValid: boolean = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? {passwordStrength: true} : null;
  }
}
