import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngd-component-block',
    template: `
      <ngd-description-block [classData]="classData"></ngd-description-block>
      <ngd-examples-block *ngIf="classData.examples?.length > 0" [classData]="classData"></ngd-examples-block>
      <ngd-props-block *ngIf="classData.props?.length > 0" [classData]="classData"></ngd-props-block>
      <ngd-methods-block *ngIf="classData.methods?.length > 0" [classData]="classData"></ngd-methods-block>            
      <ngd-styles-block *ngIf="classData.styles?.length > 0" [classData]="classData"></ngd-styles-block>
`
})
export class NgdComponentBlockComponent implements OnInit {

  @Input() classData: any;

  ngOnInit() { }

}
