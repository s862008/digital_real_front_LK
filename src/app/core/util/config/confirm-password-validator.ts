import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(passwordControl: FormControl): ValidatorFn {
    return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
        const confirmPassword: string = confirmPasswordControl.value;
        const password: string = passwordControl.value;

        if (!confirmPassword) {
            return null;
        }

        if (!password) {
            return null;
        }

        const passwordValid: boolean = password === confirmPassword;
        return !passwordValid ? {passwordConfirmation: true} : null;
    }
}
