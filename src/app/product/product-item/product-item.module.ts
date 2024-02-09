import { NgModule } from '@angular/core';

import {ProductItemComponent} from './product-item.component';
import {SharedModule} from '../../shared/shared.module';
import {RatingModule} from 'primeng/rating';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [ProductItemComponent],
  imports: [
    SharedModule, RatingModule, LocationPreviewModule, UserPreviewShortModule, CompanyPreviewShortModule, RouterModule,
    FormsModule, LazyImgModule
  ],
  exports: [ProductItemComponent]
})
export class ProductItemModule { }
