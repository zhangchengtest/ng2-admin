import { Directive, ElementRef, AfterViewInit, HostBinding, OnInit } from '@angular/core';

@Directive({
    selector: '[ngdColorSwatch]',
})
export class NgdColorSwatchDirective implements AfterViewInit {
  constructor(private el: ElementRef) { }
  @HostBinding('class.color-swatch') isColor: boolean = false;
  color: string;

  ngAfterViewInit() {
    if (this.el.nativeElement.innerHTML.search( /(#|rgba)/i ) !== -1 ) {
      this.isColor = true;
      this.color = this.el.nativeElement.innerHTML;
      this.el.nativeElement.innerHTML = `${this.color}<div style="background: ${this.color}"></div>`;
    }
  }
}
