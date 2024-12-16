import { Injectable } from '@angular/core';
import { MenuButtonService } from './menu-button.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowScrollBlockService {
  private isBlock$ = new BehaviorSubject<boolean>(false);

  public getState() {
    return this.isBlock$.asObservable();
  }

  public block() {
    this.isBlock$.next(true);
  }

  public unblock() {
    this.isBlock$.next(false);
  }
}
