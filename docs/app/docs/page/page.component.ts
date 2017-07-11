/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NgaMenuService } from '@akveo/nga-theme';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'ngd-page',
  styleUrls: ['page.component.scss'],
  template: `
    <nga-card>
      <nga-card-header>{{ currentItem?.name }}</nga-card-header>
      <nga-card-body>
        <ng-container *ngFor="let item of currentItem?.children">
          <ng-container [ngSwitch]="item.block">
            
            <react-markdown-block *ngSwitchCase="'markdown'" [block]="item"></react-markdown-block>
            <react-description-block *ngSwitchCase="'description'" [klass]="item.klass"></react-description-block>
            <react-examples-block *ngSwitchCase="'examples'" [klass]="item.klass"></react-examples-block>
            <react-props-block *ngSwitchCase="'props'" [klass]="item.klass"></react-props-block>
            <react-methods-block *ngSwitchCase="'methods'" [klass]="item.klass"></react-methods-block>            
          
          </ng-container>
        </ng-container>
       </nga-card-body>
     </nga-card>
  `,
})
export class NgdPageComponent {

  currentItem: any;
  private routerSubscription: Subscription;

  constructor(private menuService: NgaMenuService,
              private router: Router,
              private renderer: Renderer2,
              private titleService: Title) {  }

  ngOnInit() {
    this.menuService.getSelectedItem()
      .subscribe((event: {tag: string, item: any}) => {
        if (event && event.item && event.item.data) {
          this.currentItem = event.item.data;
          this.titleService.setTitle(`NGA Documentation - ${event.item.data.name}`);

          this.renderer.setProperty(document.body, 'scrollTop', 0);
        }
      });

    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .switchMap(event => this.menuService.getSelectedItem())
      .subscribe((event: {tag: string, item: any}) => {
        if (event && event.item && event.item.data) {
          this.currentItem = event.item.data;
          this.titleService.setTitle(`NGA Documentation - ${event.item.data.name}`);

          this.renderer.setProperty(document.body, 'scrollTop', 0);
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
