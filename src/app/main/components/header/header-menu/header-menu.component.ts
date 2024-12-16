import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TabItem } from '../../tab-menu/tab-menu.component';
import { MenuButtonService } from '../../../../core/services/menu-button.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-menu',
  templateUrl: 'header-menu.component.html',
  styleUrls: ['header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  @Input() menu: TabItem[] = [];
  public active = false;

  private destroy$ = new Subject<void>();
  constructor(private menuButtonService: MenuButtonService) {}

  ngOnInit() {
    this.menuButtonService
      .getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => (this.active = v));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeMenuByPopup() {
    this.menuButtonService.offButton();
  }
}
