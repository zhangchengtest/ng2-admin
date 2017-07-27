import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NgdFragmentService {

  private fragments$ = new Subject();

  newFragment(fragment: string): void {
    this.fragments$.next(fragment);
  }

  onFragmentClick(): Observable<string> {
    return this.fragments$.share();
  }
}
