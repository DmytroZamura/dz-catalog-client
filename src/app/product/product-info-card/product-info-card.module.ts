import { NgModule } from '@angular/core';
import {ProductInfoCardComponent} from './product-info-card.component';
import {SharedModule} from '../../shared/shared.module';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {RatingModule} from 'primeng/rating';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [ProductInfoCardComponent],
  imports: [
    SharedModule, LocationPreviewModule, RatingModule, RouterModule, FormsModule, LazyImgModule
  ],
  exports: [ProductInfoCardComponent]
})
export class ProductInfoCardModule { }
