import {Directive, AfterViewInit, Input, HostListener, Output, EventEmitter, ElementRef} from '@angular/core';
import {Subject} from 'rxjs';
import {pairwise, filter} from 'rxjs/operators';


@Directive({
  selector: '[appInfscroll]'
})
export class InfscrollDirective implements AfterViewInit {

  scrollEvent;

  @Output() public scrolled = new EventEmitter<void>();

  _completedFetching: boolean;
  @Input()
  set completedFetching(val) {
    this._completedFetching = val;
    if (val) {
      this.updateScrollTop();
    }
  }

  subject = new Subject<any>();
  obs = this.subject.asObservable();
  lastScrollHeight;

  constructor(private el: ElementRef) {
  }

  @HostListener('scroll') onScrollEvent() {
    const target = this.el.nativeElement;
    this.subject.next({
      scrollHeight: target.scrollHeight,
      scrollTop: target.scrollTop,
      clientHeight: target.clientHeight
    });
  }

  ngAfterViewInit() {
    this.scrollEvent = this.obs
      .pipe(
        pairwise(),
        filter(this.isScrollingUpPastThreshold.bind(this))).subscribe(val => {
        this.scrolled.emit();
      });
  }


  updateScrollTop() {

    if (!this.lastScrollHeight) {
      return;
    }
    const target = this.el.nativeElement;
    // console.log('updateScrollTop', target.scrollTop, target.scrollHeight, this.lastScrollHeight);
    target.scrollTop = (target.scrollHeight - this.lastScrollHeight);
  }

  isScrollingUpPastThreshold(ePair) {
    const before = ePair[0];
    const current = ePair[1];
    const threshold = current.clientHeight * .35;

    const position = current.scrollTop;
    const result = before.scrollTop > current.scrollTop && position < threshold;
    this.lastScrollHeight = result ? current.scrollHeight : null;
    return result;
  }
}
