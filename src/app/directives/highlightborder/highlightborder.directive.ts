import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightborder]'
})
export class HighlightborderDirective {

  constructor(private el: ElementRef) { }

  @Input('appHighlightborder') highlightColor: string;


  @HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.highlightColor || '#00796b');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;


}


}
