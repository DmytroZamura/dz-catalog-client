import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {UserImagePreviewComponent} from './user-image-preview.component';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [UserImagePreviewComponent],
  imports: [
    CommonModule, ButtonModule, LazyImgModule
  ],
  exports: [UserImagePreviewComponent]
})
export class UserImagePreviewModule { }
