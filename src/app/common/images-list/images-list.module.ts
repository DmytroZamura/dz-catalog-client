import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImagesListComponent} from './images-list.component';
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [ImagesListComponent],
  imports: [
    CommonModule, ButtonModule, GalleriaModule, LazyImgModule
  ],
  exports: [ImagesListComponent]
})
export class ImagesListModule { }
