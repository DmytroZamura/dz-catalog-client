import { NgModule } from '@angular/core';


import { CompanyViewRoutingModule } from './company-view-routing.module';
import {CompanyViewComponent} from './company-view.component';
import {SharedModule} from '../../shared/shared.module';
import {CompanyEmployeesComponent} from './company-employees/company-employees.component';
import {CompanyOverviewComponent} from './company-overview/company-overview.component';
import {CompanyPostsComponent} from './company-posts/company-posts.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../../post/filtered-posts-list/filtered-posts-list.module';
import {AdsenseModule} from 'ng2-adsense';
import {FormsModule} from '@angular/forms';
import {FavoriteButtonModule} from '../../common/favorite-button/favorite-button.module';
import {FollowCompanyButtonModule} from '../follow-company-button/follow-company-button.module';
import {SupplyRequestModule} from '../../supply-request/supply-request.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {RatingModule} from 'primeng/rating';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../../product/product-item/product-item.module';
import {UserFeedPreviewModule} from '../../common/user-feed-preview/user-feed-preview.module';




@NgModule({
  declarations: [CompanyViewComponent, CompanyEmployeesComponent, CompanyOverviewComponent, CompanyPostsComponent],
  imports: [
    SharedModule,
    CompanyViewRoutingModule,
    ProgressSpinnerModule,
    TabMenuModule,
    HighlightborderModule,
    ItemsListAgileModule,
    ManageItemsListModule,


    ProductItemModule,
    UserFeedPreviewModule,
    CreatePostModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    AdsenseModule,
    RatingModule,
    FormsModule,
    FavoriteButtonModule,
    FollowCompanyButtonModule,
    SupplyRequestModule,
    TextShowMoreModule,
    ChipsModule,
    ButtonModule,
    DeviceDetectorModule.forRoot(),
    LazyImgModule
  ]
})
export class CompanyViewModule { }
