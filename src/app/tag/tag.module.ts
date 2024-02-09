import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagRoutingModule} from './tag-routing.module';
import {TagComponent} from './tag.component';
import {TagPreviewModule} from './tag-preview/tag-preview.module';
import {FilterNavigatorModule} from '../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../post/filtered-posts-list/filtered-posts-list.module';
import {AdsenseModule} from 'ng2-adsense';
import {TabMenuModule} from 'primeng/tabmenu';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ItemsListAgileModule} from '../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../product/product-item/product-item.module';
import {UserFeedPreviewModule} from '../common/user-feed-preview/user-feed-preview.module';
import {CompanyFeedPreviewModule} from '../common/company-feed-preview/company-feed-preview.module';
import {CommunityItemModule} from '../community/community-item/community-item.module';


@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    TagPreviewModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    AdsenseModule,
    TabMenuModule,
    DeviceDetectorModule.forRoot(),
    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule,
    UserFeedPreviewModule,
    CompanyFeedPreviewModule,
    CommunityItemModule,
  ]
})
export class TagModule {
}
