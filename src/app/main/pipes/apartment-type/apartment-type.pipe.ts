import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apartmentType',
})
export class ApartmentTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
