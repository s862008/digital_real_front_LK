import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuButtonService } from '../../../../core/services/menu-button.service';

@Component({
  selector: 'app-header-burger-button',
  templateUrl: 'header-burger-button.component.html',
  styleUrls: ['header-burger-button.component.css'],
})
export class HeaderBurgerButtonComponent implements OnInit, OnDestroy {
  public state = false;
  private destroy$ = new Subject<void>();
  constructor(private menuButtonService: MenuButtonService) {}

  ngOnInit() {
    this.menuButtonService
      .getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => (this.state = v));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickButton() {
    if (this.state) {
      this.menuButtonService.offButton();
    } else {
      this.menuButtonService.onButton();
    }
  }
}
