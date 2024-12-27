import { ViewportRuler } from '@angular/cdk/scrolling';
import { Injectable, NgZone } from '@angular/core';
import { tap, throttleTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResizeService {
  constructor(private ngZone: NgZone, private viewportRuler: ViewportRuler) {}

  get onResize$() {
    return this.ngZone.runOutsideAngular(() =>
      this.viewportRuler.change().pipe(
        tap((value) =>
          this.ngZone.run(() => {
            console.log(value);
          })
        )
      )
    );
  }
}
