import { Component, OnDestroy, OnInit } from '@angular/core';
import { WindowScrollBlockService } from './core/services/window-scroll-block.service';
import { MenuButtonService } from './core/services/menu-button.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private windowScrollBlockService: WindowScrollBlockService,
    private menuButtonService: MenuButtonService
  ) {}
  public ngOnInit(): void {
    this.menuButtonService
      .getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        if (v) {
          this.windowScrollBlockService.block();
        } else {
          this.windowScrollBlockService.unblock();
        }
      });

    this.windowScrollBlockService
      .getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        const body = document.querySelector('body')!;
        if (v) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = 'auto';
        }
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  title = 'digital_real_front_A1';
}
