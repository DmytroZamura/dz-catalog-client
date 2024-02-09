import { NgModule } from '@angular/core';

import { ArticleViewRoutingModule } from './article-view-routing.module';
import {ArticleViewComponent} from './article-view.component';
import {SharedModule} from '../../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {LocationPreviewModule} from '../../../common/location-preview/location-preview.module';
import {CategoriesNavigatorModule} from '../../../category/categories-navigator/categories-navigator.module';
import {CompanyPreviewShortModule} from '../../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../../common/user-preview-short/user-preview-short.module';
import {FavoriteButtonModule} from '../../../common/favorite-button/favorite-button.module';

import {RouteTransformerModule} from '../../../directives/route-transformer/route-transformer.module';
import {AdsenseModule} from 'ng2-adsense';
import {ChipsModule} from 'primeng/chips';
import {LikeModule} from '../../like/like.module';
import {ButtonModule} from 'primeng/button';
import {CommentsListModule} from '../../comment/comments-list/comments-list.module';
import {PostPreviewModule} from '../../post-preview/post-preview.module';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule} from '@angular/router';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyImgModule} from '../../../directives/lazy-img/lazy-img.module';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';
import {DateAgoModule} from '../../../pipes/date-ago/date-ago.module';




@NgModule({
  declarations: [ArticleViewComponent],
  imports: [
    SharedModule,
    ArticleViewRoutingModule,
    ProgressSpinnerModule,
    LocationPreviewModule,
    CategoriesNavigatorModule,
    CompanyPreviewShortModule,
    UserPreviewShortModule,
    FavoriteButtonModule,

    RouteTransformerModule,
    AdsenseModule.forRoot(),
    ChipsModule,
    LikeModule,
    ButtonModule,
    CommentsListModule,
    PostPreviewModule,
    FormsModule,
    TooltipModule,
    RouterModule,
    DeviceDetectorModule.forRoot(),
    LazyImgModule,
    SafeHtmlModule,
    DateAgoModule
  ]
})
export class ArticleViewModule { }
