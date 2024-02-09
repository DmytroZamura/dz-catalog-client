import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appAuthFix]'
})
export class AuthFixDirective {

  keyupEvent: KeyboardEvent = new KeyboardEvent('keyup');
  paste = false;

  @HostListener('paste') onPaste() {
    this.paste = true;
  }

  @HostListener('input', ['$event.target']) onInput(target: any) {
    if (this.paste) {
      // target.parentElement.dispatchEvent(this.keyupEvent);
      target.dispatchEvent(this.keyupEvent);
      this.paste = false;
    }
  }

  constructor() {
  }

}
