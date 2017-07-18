/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-methods-block',
  template: `
    <p class="block-title"><a [routerLink]="" fragment="{{className}}Methods" ngdFragment> <i class="ion-link"></i></a> Methods</p>
    
    <table class="table" *ngIf="classMethods?.length > 0">
      <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let method of classMethods">
          <td>{{ method.name }}</td>
          <td>
          <div class="method-signature">
            <div><i>parameters:</i>
              <span *ngFor="let param of method.params; let last = last">
                {{param.name}}: <code>{{param.type}}</code><span *ngIf="!last">,</span>
              </span> 
            </div>
            <div>
             <i>return type:</i> 
              <code>{{ method.type.join(",\\n") }}</code>
            </div>
          </div>
          <div ngdDescription>
            {{method.shortDescription}} <br> {{ method.description }} 
          </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngFor="let method of classMethods">
      <div *ngIf="method.examples.length > 0">
        <ngd-examples-block  [classData]="method" [title]="'Examples of usage ' + method.name"></ngd-examples-block>
      </div>
    </div>  
`,
})
export class NgdMethodsBlockComponent {

  classMethods: any;
  className: string;

  @Input() block: any;
  @Input('classData')
  set setProps(classData: any) {
    this.classMethods = classData.methods;
    this.className = classData.name;
  };
}
