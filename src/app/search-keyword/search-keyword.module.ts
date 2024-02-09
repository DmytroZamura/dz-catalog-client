import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchKeywordRoutingModule } from './search-keyword-routing.module';
import {SearchKeywordComponent} from './search-keyword.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {FilterNavigatorModule} from '../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../post/filtered-posts-list/filtered-posts-list.module';
import {AdsenseModule} from 'ng2-adsense';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ItemsListAgileModule} from '../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../product/product-item/product-item.module';
import {UserFeedPreviewModule} from '../common/user-feed-preview/user-feed-preview.module';
import {CompanyFeedPreviewModule} from '../common/company-feed-preview/company-feed-preview.module';
import {CommunityItemModule} from '../community/community-item/community-item.module';
import {TagPreviewModule} from '../tag/tag-preview/tag-preview.module';



@NgModule({
  declarations: [SearchKeywordComponent],
  imports: [
    CommonModule,
    SearchKeywordRoutingModule,
    TabMenuModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    AdsenseModule,
    DeviceDetectorModule.forRoot(),

    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule,
    UserFeedPreviewModule,
    CompanyFeedPreviewModule,
    CommunityItemModule,
    TagPreviewModule
  ]
})
export class SearchKeywordModule { }
