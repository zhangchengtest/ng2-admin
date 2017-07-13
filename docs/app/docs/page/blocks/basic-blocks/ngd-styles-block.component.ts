/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-styles-block',
  template: `
    <div class="block-container" *ngFor="let style of classData.styles">
      <p class="block-title">{{ style.shortDescription }}</p>
      <table class="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of style.styles">
            <td>{{ item.name}}</td>
            <td>
              <p *ngIf="item.shortDescription" ngdDescription>{{ item.shortDescription}}</p>
              <p *ngIf="item.description" ngdDescription>{{ item.description }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
`,
})
export class NgdStylesBlockComponent {

  @Input() classData: any;

}
