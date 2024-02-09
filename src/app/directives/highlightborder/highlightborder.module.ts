import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightborderDirective} from './highlightborder.directive';




@NgModule({
  declarations: [HighlightborderDirective],
  imports: [
    CommonModule
  ],
  exports: [HighlightborderDirective]
})
export class HighlightborderModule { }
