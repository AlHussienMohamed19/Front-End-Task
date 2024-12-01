// loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderCount = 0;
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderSubject.asObservable();

  show() {
    this.loaderCount++;
    if (this.loaderCount > 0) {
      this.loaderSubject.next(true);
    }
  }

  hide() {
    if (this.loaderCount > 0) {
      this.loaderCount--;
      if (this.loaderCount === 0) {
        this.loaderSubject.next(false);
      }
    }
  }
}
