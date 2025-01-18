import {Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appPriceFormatter]',
})
export class PriceFormatterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    // Считываем текущее значение инпута и сохраняем позицию курсора
    const input = this.el.nativeElement;
    const startPos = input.selectionStart;
    let value: string = input.value;

    // Удаление ведущих нулей
    value = value.replace(/^0+/, '');

    // Форматирование значения (замена на пробелы)
    let formattedValue = value.replace(/\D/g, ''); // Убираем нецифровые символы
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Добавляем пробелы для thousands

    // Устанавливаем отформатированное значение
    input.value = formattedValue;

    // Восстанавливаем позицию курсора
    const newPos = this.calculateCursorPosition(startPos, value, formattedValue);

    input.setSelectionRange(newPos, newPos);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement;

    // Обработка нажатия Backspace
    if (event.key === 'Backspace') {
      const startPos = input.selectionStart;
      if (startPos > 0 && input.value[startPos - 1] === ' ') {
        event.preventDefault();
        // Удаляем символ перед пробелом
        this.removeCharacterBeforeSpace(startPos);
      }
    }

    // Обработка нажатия Delete
    if (event.key === 'Delete') {
      const startPos = input.selectionStart;

      if (startPos < input.value.length && input.value[startPos] === ' ') {
        event.preventDefault();
        // Удаляем символ после пробела
        this.removeCharacterAfterSpace(startPos);
      }
    }
  }

  private removeCharacterBeforeSpace(position: number) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\s+/g, '');

    value = value.slice(0, position - 2) + value.slice(position - 1);

    input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    this.updateCursorAfterRemove(position - 2);
  }

  private removeCharacterAfterSpace(position: number) {
    const input = this.el.nativeElement;
    let value = input.value;

    // Удаляем символ после пробела
    if (position < value.length - 1) {
      value = value.slice(0, position + 1) + value.slice(position + 2); // Удаление символа
      input.value = value;
      this.updateCursorAfterRemove(position);
    }
  }

  private updateCursorAfterRemove(newPos: number) {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\s+/g, ''); // Получаем новое значение

    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const updatePos = this.calculateCursorPosition(newPos, value, formattedValue);

    input.value = formattedValue;
    input.setSelectionRange(updatePos, updatePos); // устанавливаем курсор на новое место
  }

  private calculateCursorPosition(oldPos: number, oldValue: string, newValue: string): number {
    let offset = 0;

    if (oldPos === 0) {
      return oldPos;
    }

    // Учитываем, сколько пробелов было добавлено или удалено
    const oldSpaces = (oldValue.match(/ /g) || []).length;
    const newSpaces = (newValue.match(/ /g) || []).length;

    offset = newSpaces - oldSpaces; // Разница в количестве пробелов

    // Возвращаем скорректированное положение курсора
    return oldPos + offset;
  }
}
