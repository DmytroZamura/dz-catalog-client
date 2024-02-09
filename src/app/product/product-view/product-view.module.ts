import { NgModule } from '@angular/core';
import { ProductViewRoutingModule } from './product-view-routing.module';
import {ProductViewComponent} from './product-view.component';
import {SharedModule} from '../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {CategoriesNavigatorModule} from '../../category/categories-navigator/categories-navigator.module';
import {RouterModule} from '@angular/router';
import { RatingModule} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {FavoriteButtonModule} from '../../common/favorite-button/favorite-button.module';
import {SupplyRequestModule} from '../../supply-request/supply-request.module';
import {ButtonModule} from 'primeng/button';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {ChipsModule} from 'primeng/chips';
import {AttributesModule} from '../../attribute/attributes.module';
import {AdsenseModule} from 'ng2-adsense';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {ProductImageViewModule} from '../product-image/product-image-view/product-image-view.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {PostItemModule} from '../../post/post-item/post-item.module';
import {SendPostRespondModule} from '../../post/respond/send-post-respond/send-post-respond.module';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';






@NgModule({
  declarations: [ProductViewComponent],
  imports: [
    SharedModule,
    ProductViewRoutingModule,
    ProgressSpinnerModule,
    TabMenuModule,
    CategoriesNavigatorModule,
    RouterModule,
    RatingModule,
    FormsModule,
    LocationPreviewModule,
    UserPreviewShortModule,
    CompanyPreviewShortModule,
    FavoriteButtonModule,
    SupplyRequestModule,
    ButtonModule,
    TextShowMoreModule,
    ChipsModule,
    AttributesModule,
    AdsenseModule,
    CreatePostModule,
    ProductImageViewModule,


    ItemsListAgileModule,
    ManageItemsListModule,
    PostItemModule,
    SendPostRespondModule,
    DateAgoModule,

    DeviceDetectorModule.forRoot(),
    LazyImgModule

  ]
})
export class ProductViewModule { }
