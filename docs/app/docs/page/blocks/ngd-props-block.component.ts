/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-props-block',
  template: `    
    <div class="block-container">
      <p class="block-title">Props</p>
      <table class="table" *ngIf="classData.props.length > 0">
       <thead>
         <tr>
           <td>Name</td>
           <td>Type</td>
           <td>Description</td>
         </tr>
       </thead>
       <tbody>
         <tr *ngFor="let prop of classData?.props">
           <td>{{ prop.name }}</td>
           <td><code>{{ prop.type }}</code></td>
           <td>
              <p *ngIf="!!prop.shortDescription" ngdDescription>{{ prop.shortDescription }}</p>
              <p *ngIf="!!prop.description" ngdDescription>{{ prop.description }}</p>
           </td>
         </tr>
       </tbody>
      </table>
    </div>
  `,
})
export class NgdPropsBlockComponent {

  @Input() classData: any;

}
