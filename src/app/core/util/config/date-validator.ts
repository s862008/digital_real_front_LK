import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    let isDate: boolean = moment(value, "DD.MM.YYYY", true).isValid();
    return isDate ? null : {dateInvalid: true};
  }
}
