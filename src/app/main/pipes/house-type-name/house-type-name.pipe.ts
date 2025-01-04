import { Pipe, PipeTransform } from '@angular/core';

const HOUSE_TYPES = [
  'Кирпичный',
  'Монолитный',
  'Панельный',
  'Кирпично-монолитный',
  'Блочный',
  'Другой',
];

@Pipe({
  name: 'houseTypeName',
})
export class HouseTypeNamePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (HOUSE_TYPES && HOUSE_TYPES.length >= value) {
      return HOUSE_TYPES[value - 1];
    }
    return '';
  }
}
