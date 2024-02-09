import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocationPreviewComponent} from './location-preview.component';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [LocationPreviewComponent],
  imports: [
    CommonModule, LazyImgModule
  ],
  exports: [LocationPreviewComponent]
})
export class LocationPreviewModule { }
