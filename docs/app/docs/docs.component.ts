/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';

import { NgaMenuItem } from '@akveo/nga-theme';
import { NgaMenuInternalService } from '@akveo/nga-theme/components/menu/menu.service';
import { DocsService } from './docs.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'ngd-docs',
  styleUrls: ['docs.component.scss'],
  template: `
     <nga-layout>
      <nga-layout-header fixed>
        <ngd-header></ngd-header>
      </nga-layout-header>
      <nga-sidebar>
        <nga-sidebar-content>
          <nga-menu [items]="menuItems" tag="leftMenu"></nga-menu>
        </nga-sidebar-content>
      </nga-sidebar>
      <nga-layout-column>
        <router-outlet></router-outlet>
      </nga-layout-column>
    </nga-layout>
  `,
})
export class NgdDocsComponent implements OnDestroy, AfterViewInit {

  structure: any;
  menuItems: List<NgaMenuItem> = List([]);
  private routerSubscription: Subscription;
  private fragmentSubscription: Subscription;

  constructor(private service: DocsService,
              private router: Router,
              private route: ActivatedRoute,
              private menuInternalService: NgaMenuInternalService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {

    this.menuItems = this.service.getPreparedMenu();
    this.structure = this.service.getPreparedStructure();

    this.routerSubscription = this.router.events
      .subscribe((event) => {
        if (event['url'] === '/docs') {
          const firstMenuItem = this.menuItems.get(0).children.get(0);
          this.menuInternalService.itemSelect(firstMenuItem);
          this.router.navigateByUrl(firstMenuItem.link, { replaceUrl: true });
        }
      });
  }

  ngAfterViewInit() {
    this.fragmentSubscription = this.route.fragment
      .merge(this.service.onFragmentClick())
      .delay(1)
      .subscribe((fr) => {
        if (fr) {
          const el = this.elementRef.nativeElement.querySelector(`#${fr}`);
          if (el) {
            el.scrollIntoView();
            if (new RegExp(/theme/i).test(fr)) {
              window.scrollBy(0, -130);
              this.renderer.addClass(el, 'highlighted-row');
              setTimeout(() => this.renderer.removeClass(el, 'highlighted-row'), 1000);
            } else {
              window.scrollBy(0, -80);
            }
          }
        } else {
          window.scrollTo(0, 0);
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }
}
