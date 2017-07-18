import {
  Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngdFragment]',
  host: {
    '[class.fragment]': 'true',
    '[attr.id]': 'fragment'
  }

})
export class NgdFragmentDirective {

  @Input() fragment: string;
}
