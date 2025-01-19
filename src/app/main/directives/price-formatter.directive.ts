import {Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appPriceFormatter]',
})
export class PriceFormatterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    const startPos = input.selectionStart;
    let value: string = input.value;

    let formattedValue = value.replace(/\D/g, '').replace(/^0+/, '');

    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    input.value = formattedValue;

    const newPos = this.calculateCursorPosition(startPos, value, formattedValue);

    input.setSelectionRange(newPos, newPos);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement;

    if (event.key === 'Backspace') {
      const startPos = input.selectionStart;
      if (startPos > 0 && input.value[startPos - 1] === ' ') {
        event.preventDefault();
        this.removeCharacterBeforeSpace(startPos);
      }
    }

    if (event.key === 'Delete') {
      const startPos = input.selectionStart;

      if (startPos < input.value.length && input.value[startPos] === ' ') {
        event.preventDefault();
        this.removeCharacterAfterSpace(startPos);
      }
    }
  }

  private removeCharacterBeforeSpace(position: number) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\s+/g, '');

    let formattedValue = value.slice(0, position - 2) + value.slice(position - 1);

    formattedValue.replace(/\D/g, '')

    input.value = formattedValue.replace(/^0+/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    this.updateCursorAfterRemove(position - 2);
  }

  private removeCharacterAfterSpace(position: number) {
    const input = this.el.nativeElement;
    let value = input.value;

    if (position < value.length - 1) {
      value = value.slice(0, position + 1) + value.slice(position + 2);
      input.value = value;
      this.updateCursorAfterRemove(position);
    }
  }

  private updateCursorAfterRemove(newPos: number) {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\s+/g, '');

    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const updatePos = this.calculateCursorPosition(newPos, value, formattedValue);

    input.value = formattedValue;
    input.setSelectionRange(updatePos, updatePos);
  }

  private calculateCursorPosition(oldPos: number, oldValue: string, newValue: string): number {
    let offset = 0;

    if (oldPos === 0) {
      return oldPos;
    }

    const oldSpaces = (oldValue.match(/ /g) || []).length;
    const newSpaces = (newValue.match(/ /g) || []).length;

    offset = newSpaces - oldSpaces;

    return oldPos + offset;
  }
}
