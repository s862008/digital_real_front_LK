import { Component, HostListener, Input, OnInit } from '@angular/core';

export interface TabItem {
  title: string;
  groups: TabLinkGroup[];
}

export interface TabLinkGroup {
  group: TabLink[];
}

export interface TabLink {
  title: string;
  link: string;
}
@Component({
  selector: 'app-tab-menu',
  templateUrl: 'tab-menu.component.html',
  styleUrls: ['tab-menu.component.css'],
})
export class TabMenuComponent implements OnInit {
  @Input() public tabs: TabItem[] = [];
  public activeNum = -1;
  constructor() {}

  public ngOnInit() {}

  @HostListener('mouseout')
  resetActiveNum() {
    this.activeNum = -1;
  }

  public changeActiveNum(num: number) {
    this.activeNum = num;
  }
}
