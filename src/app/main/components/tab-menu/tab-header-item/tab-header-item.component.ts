import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-tab-header-item',
  templateUrl: 'tab-header-item.component.html',
  styleUrls: ['tab-header-item.component.css'],
})
export class TabHeaderItemComponent implements OnInit {
  @Input() title = '';
  @Input() num: number | undefined;
  @Output() mouseOver = new EventEmitter<number>();
  @Output() mouseReturn = new EventEmitter<number>();


  constructor() {}

  ngOnInit() {}

  @HostListener('mouseover')
  onMouseOver() {
    console.log(this.num);
    this.mouseReturn.emit(this.num);
    this.mouseOver.emit(this.num);
  }
}
