import { NgModule } from '@angular/core';


import { ProfileViewRoutingModule } from './profile-view-routing.module';
import {ProfileViewComponent} from './profile-view.component';
import {SharedModule} from '../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {ProfileOverviewComponent} from './profile-overview/profile-overview.component';
import {ProfilePostsComponent} from './profile-posts/profile-posts.component';
import {ProfileProductsComponent} from './profile-products/profile-products.component';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../../post/filtered-posts-list/filtered-posts-list.module';
import {AdsenseModule} from 'ng2-adsense';

import {RatingModule} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {FollowProfileButtonModule} from './follow-profile-button/follow-profile-button.module';
import {MessageProfileButtonComponent} from './message-profile-button/message-profile-button.component';
import {SupplyRequestModule} from '../../supply-request/supply-request.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {ChipsModule} from 'primeng/chips';
import {UserEmploymentModule} from '../user-employment/user-employment.module';
import {PanelModule} from 'primeng/panel';
import {ProfileCountriesInterestModule} from '../profile-counties-interest/profile-countries-interest.module';
import {ProfileCategoriesModule} from '../profile-categories/profile-categories.module';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {ButtonModule} from 'primeng/button';
import {MessageDialogModule} from '../../common/message-dialog/message-dialog.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../../product/product-item/product-item.module';
import {UserFeedPreviewModule} from '../../common/user-feed-preview/user-feed-preview.module';




@NgModule({
  declarations: [ProfileViewComponent, ProfileOverviewComponent, ProfilePostsComponent, ProfileProductsComponent,
    MessageProfileButtonComponent],
  imports: [
    SharedModule,
    ProfileViewRoutingModule,
    ProgressSpinnerModule,
    TabMenuModule,
    CreatePostModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    AdsenseModule,

    RatingModule,
    FormsModule,
    FollowProfileButtonModule,
    SupplyRequestModule,
    TextShowMoreModule,
    ChipsModule,
    UserEmploymentModule,
    PanelModule,
    ProfileCountriesInterestModule,
    ProfileCategoriesModule,
    AdsenseModule,
    CreatePostModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    HighlightborderModule,

    ButtonModule,
    MessageDialogModule,
    DeviceDetectorModule.forRoot(),
    LazyImgModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule,
    UserFeedPreviewModule

  ]
})
export class ProfileViewModule { }
