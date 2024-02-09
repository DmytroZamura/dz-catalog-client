import { NgModule } from '@angular/core';
import {ProductImageViewComponent} from './product-image-view.component';
import {GalleriaModule} from 'primeng/galleria';
import {FileModule} from '../../../common/file/file.module';
import {SharedModule} from '../../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {LazyImgModule} from '../../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [ProductImageViewComponent],
  imports: [
    SharedModule,
    GalleriaModule,
    FileModule,
    ButtonModule,
    LazyImgModule
  ],
  exports: [ProductImageViewComponent]
})

export class ProductImageViewModule { }
