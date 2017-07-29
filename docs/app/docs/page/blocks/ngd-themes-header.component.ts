import { Component, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { DocsService } from '../../docs.service';

@Component({
  selector: 'ngd-themes-header',
  template: `
    <div class="theme-header fixed-theme-header">
      <div class="theme-header-content">
        <span class="block-title"> Theme {{themeName}}</span>
          <span *ngIf="parentTheme">inherited from {{parentTheme}} theme</span>
        <div class="theme-filter">
          <input #searchInput (keyup)="searchTerms$.next(searchInput.value)">
          <p *ngIf="isWarning" class="filter-warning">Nothing found</p>
        </div>
      </div>
    </div>
`
})
export class NgdThemesHeaderComponent implements OnInit, OnDestroy {

  themeName: string;
  parentTheme: string;
  isWarning: boolean = false;//TODO: implement sharing warning and typed search value with static headers
  themesPositions: any = [];

  searchTerms$ = new Subject();

  private scrollSubscription: Subscription;
  private searchTermsSubscription: Subscription;
  private themesSubscription: Subscription;

  @HostBinding('class.transparent') isTransparent: boolean = false;//TODO: make it transparent in the bottom of the tables

  constructor(private docsService: DocsService,
              @Inject(DOCUMENT) private document: Document) {  }


  ngOnInit() {
    this.themesSubscription = this.docsService.getThemesPositions()
      .subscribe(theme => {
        this.themesPositions = this.themesPositions.filter(item => item.name !== theme.name);
        this.themesPositions.push(theme);
      });

    this.scrollSubscription = Observable.fromEvent(window, 'scroll')
      .debounceTime(200)
      .subscribe(event => this.setCurrentTheme(this.document.body.scrollTop));

    this.searchTermsSubscription = this.searchTerms$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((term: string) => this.docsService.filterData(term, this.themeName));
  }

  setCurrentTheme(scrollPosition) {
    if (scrollPosition === 0) {
      this.isTransparent = true;
    } else {
      let scrolled = this.themesPositions.filter(theme => ((theme.position - scrollPosition - 80) < 0));
      ({ name: this.themeName, parentTheme: this.parentTheme } =
        scrolled.find(item => item.position === Math.max.apply(null, scrolled.map(theme => theme.position))));
      this.isTransparent = false;
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
    this.searchTermsSubscription.unsubscribe();
    this.themesSubscription.unsubscribe();
  }
}
