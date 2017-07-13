
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-props-block',
  template: `    
    <div  class="inputs block-container" *ngIf="classInputs.length > 0">
      <p class="block-title">Inputs</p>
      <table  class="table table-striped">
       <thead>
         <tr>
           <td>Name</td>
           <td>Type</td>
           <td>Description</td>
         </tr>
       </thead>
       <tbody>
         <tr *ngFor="let prop of classInputs">
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
    <div class="outputs block-container" *ngIf="classOutputs.length > 0">
      <p class="block-title">Outputs</p>
      <table  class="table">
       <thead>
         <tr>
           <td>Name</td>
           <td>Type</td>
           <td>Description</td>
         </tr>
       </thead>
       <tbody>
         <tr *ngFor="let prop of classOutputs">
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
  classOutputs: any = [];
  classInputs: any = [];

  @Input('classData')
  set setProps(classData: any) {
    this.classInputs = classData.props.filter(item => item.kind === "input");
    this.classOutputs = classData.props.filter(item => item.kind === "output");
  }

}
