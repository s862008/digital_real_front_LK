import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TabLinkGroup } from '../tab-menu.component';

@Component({
  selector: 'app-tab-body-item',
  templateUrl: 'tab-body-item.component.html',
  styleUrls: ['tab-body-item.component.css'],
})
export class TabBodyItemComponent implements OnInit {
  @Input() groups: TabLinkGroup[] = [];
  @Input() num: number | undefined;
  @Output() mouseOver = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  @HostListener('mouseover')
  onMouseOver() {
    console.log(this.num);
    this.mouseOver.emit(this.num);
  }
}
