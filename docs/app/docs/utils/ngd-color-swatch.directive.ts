import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[ngdColorSwatch]',
})
export class NgdColorSwatchDirective implements AfterViewInit {
  constructor(private el: ElementRef,
              private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.el.nativeElement.innerHTML.search( /(#|rgba)/i ) !== -1 ) {
      this.renderer.addClass(this.el.nativeElement, 'color-swatch');
      let color = this.el.nativeElement.innerHTML;
      this.el.nativeElement.innerHTML = `${color}<div style="background: ${color}"></div>`;
    }
  }
}
