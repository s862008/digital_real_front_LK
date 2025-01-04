import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentRounds',
})
export class PercentRoundsPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value != 0) {
      return `${Math.round(value)}%`;
    }

    return '';
  }
}
