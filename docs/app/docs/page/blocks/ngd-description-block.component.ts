/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ngd-description-block',
  template: `
    <div class="block-container">
      <p *ngIf="isShortDescription" class="short-description">
        {{ classData?.shortDescription }}
      </p>
      <p *ngIf="isDescription" ngdDescription class="description">
        {{classData?.description}}
      </p>
    </div>
  `,
})
export class NgdDescriptionBlockComponent implements OnChanges {

  @Input() classData: any;
  isDescription: boolean;
  isShortDescription: boolean;

  ngOnChanges() {
    this.isShortDescription = !!this.classData.shortDescription && this.classData.shortDescription != this.classData.name;
    this.isDescription = !!this.classData.description && this.classData.description != this.classData.shortDescription;
  }
}
