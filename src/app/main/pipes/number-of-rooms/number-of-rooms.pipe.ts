import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOfRooms',
})
export class NumberOfRoomsPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    let rooms = '';
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value)) {
      rooms = value + '-ком. квартира, ';
    } else if (value == 0) {
      rooms = 'Свободная планировка, ';
    } else if (value == 0.5) {
      rooms = 'Студия, ';
    } else if (value !== Math.floor(value)) {
      rooms = value + '-евро, ';
    } else {
      rooms = 'Многокомнатная квартира, ';
    }

    return rooms;
  }
}
