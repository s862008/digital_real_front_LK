import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuButtonService {
  private state$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  getState() {
    return this.state$.asObservable();
  }

  offButton() {
    this.state$.next(false);
  }

  onButton() {
    this.state$.next(true);
  }
}
