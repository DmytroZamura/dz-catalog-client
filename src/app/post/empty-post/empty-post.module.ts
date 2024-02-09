import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmptyPostComponent} from './empty-post.component';



@NgModule({
  declarations: [EmptyPostComponent],
  imports: [
    CommonModule
  ],
  exports: [EmptyPostComponent]
})
export class EmptyPostModule { }
