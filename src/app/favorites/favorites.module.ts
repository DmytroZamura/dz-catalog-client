import { NgModule } from '@angular/core';

import { FavoritesRoutingModule } from './favorites-routing.module';
import {FavoritesComponent} from './favorites.component';
import {AdsenseModule} from 'ng2-adsense';
import {TabMenuModule} from 'primeng/tabmenu';
import {SharedModule} from '../shared/shared.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ItemsListAgileModule} from '../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../general/manage-items-list/manage-items-list.module';
import {CompanyFeedPreviewModule} from '../common/company-feed-preview/company-feed-preview.module';
import {UserFeedPreviewModule} from '../common/user-feed-preview/user-feed-preview.module';
import {ProductItemModule} from '../product/product-item/product-item.module';
import {PostItemModule} from '../post/post-item/post-item.module';
import {DateAgoModule} from '../pipes/date-ago/date-ago.module';
import {SendPostRespondModule} from '../post/respond/send-post-respond/send-post-respond.module';
import {CommunityItemModule} from '../community/community-item/community-item.module';
import {TagPreviewModule} from '../tag/tag-preview/tag-preview.module';



@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    SharedModule,
    FavoritesRoutingModule,

    AdsenseModule,
    TabMenuModule,
    DeviceDetectorModule.forRoot(),
    DateAgoModule,

    ItemsListAgileModule,
    ManageItemsListModule,
    CompanyFeedPreviewModule,
    UserFeedPreviewModule,
    ProductItemModule,
    PostItemModule,
    SendPostRespondModule,
    CommunityItemModule,
    TagPreviewModule
  ]
})
export class FavoritesModule { }
