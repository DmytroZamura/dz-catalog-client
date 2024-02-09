import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfscrollDirective} from './infscroll.directive';



@NgModule({
  declarations: [InfscrollDirective],
  imports: [
    CommonModule
  ],
  exports: [InfscrollDirective]
})
export class InfscrollModule { }
