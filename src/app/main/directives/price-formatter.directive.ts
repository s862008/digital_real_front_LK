import {Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appPriceFormatter]',
})
export class PriceFormatterDirective {

  currentValue: string = ''

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    const startPos = input.selectionStart;
    const value: string = input.value.replace(/\s+/g, '');
    const oldValue = this.currentValue;

    const onlyNumberValue = value.replace(/\D/g, '');
    const formattedValue = onlyNumberValue.replace(/^0+/, '');
    const separatedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const newPos = this.calculateCursorPosition(startPos, oldValue, formattedValue);

    this.currentValue = formattedValue;
    input.value = separatedValue;

    if (value !== onlyNumberValue) {
      input.setSelectionRange(startPos - 1, startPos - 1);
    } else {
      input.setSelectionRange(newPos, newPos);
    }
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
    const value = input.value;

    const newLeftPartWithoutSpaces = value.slice(0, position - 2).replace(/\s+/g, '')
    const newRightPartWithoutSpaces = value.slice(position - 1).replace(/\s+/g, '')

    const formattedValue = newLeftPartWithoutSpaces + newRightPartWithoutSpaces

    input.value = formattedValue.replace(/^0+/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    this.updateCursorAfterRemove(position - 2);
  }

  private removeCharacterAfterSpace(position: number) {
    const input = this.el.nativeElement;
    let value = input.value;

    let newLeftPartWithoutSpaces = value.slice(0, position).replace(/\s+/g, '')
    let newRightPartWithoutSpaces = value.slice(position + 2).replace(/\s+/g, '')

    let formattedValue = newLeftPartWithoutSpaces + newRightPartWithoutSpaces

    input.value = formattedValue.replace(/^0+/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    this.updateCursorAfterRemove(position);
  }

  private updateCursorAfterRemove(newPos: number) {
    const input = this.el.nativeElement;
    let oldValue = this.currentValue;
    const value = input.value.replace(/\s+/g, '');
    let formattedValue = value.replace(/^0+/, '');

    const updatePos = this.calculateCursorPosition(newPos, oldValue, formattedValue);

    let separatedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    input.value = separatedValue;
    input.setSelectionRange(updatePos, updatePos);
  }

  private calculateCursorPosition(oldPos: number, oldValue: string, newValue: string): number {
    let offset = 0;

    if (oldPos === 0) {
      return oldPos;
    }

    const oldValuePartFrontOfCursor = oldValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').slice(0, oldPos)
    const newValuePartFrontOfCursor = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').slice(0, oldPos)

    let separatedValue = (oldValuePartFrontOfCursor.match(/ /g) || []).length;
    let separatedValue1 = (newValuePartFrontOfCursor.match(/ /g) || []).length;

    offset = separatedValue1 - separatedValue;

    if (oldValuePartFrontOfCursor.slice(-1) === ' ' && offset === -1) {
      return oldPos + 1;
    }

    if (offset < 0) {
      return oldPos - 1;
    }

    return oldPos + Math.abs(offset);
  }
}
