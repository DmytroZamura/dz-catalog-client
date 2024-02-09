import { NgModule } from '@angular/core';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from './community.component';
import {SharedModule} from '../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {CommunityFeedComponent} from './community-feed/community-feed.component';
import {CommunityMembersModule} from './community-members/community-members.module';
import {CommunityCompaniesModule} from './community-companies/community-companies.module';
import {CommunityProductsComponent} from './community-products/community-products.component';
import {CommunityInvitationsModule} from './community-invitations/community-invitations.module';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {TextShowMoreModule} from '../common/text-show-more/text-show-more.module';
import {ChipsModule} from 'primeng/chips';
import {CommunityButtonsModule} from './community-buttons/community-buttons.module';
import {RouterModule} from '@angular/router';
import {CreatePostModule} from '../post/create-post/create-post.module';
import {FilterNavigatorModule} from '../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../post/filtered-posts-list/filtered-posts-list.module';
import {ProcessDialogModule} from '../common/process-dialog/process-dialog.module';

import {FormsModule} from '@angular/forms';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyImgModule} from '../directives/lazy-img/lazy-img.module';
import {ItemsListAgileModule} from '../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../product/product-item/product-item.module';



@NgModule({
  declarations: [CommunityComponent, CommunityFeedComponent, CommunityProductsComponent],
  imports: [
    SharedModule,
    CommunityRoutingModule, ProgressSpinnerModule, TabMenuModule, CommunityMembersModule, CommunityCompaniesModule,
    CommunityInvitationsModule,
    MenuModule,
    ButtonModule,
    TextShowMoreModule,
    ChipsModule,
    CommunityButtonsModule,
    RouterModule,
    CreatePostModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    ProcessDialogModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    LazyImgModule
  ]
})
export class CommunityModule { }
