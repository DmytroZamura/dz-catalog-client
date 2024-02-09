import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PostItemComponent} from './post-item.component';
import {SharedModule} from '../../shared/shared.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {FavoriteButtonModule} from '../../common/favorite-button/favorite-button.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';

import {ButtonModule} from 'primeng/button';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {CommonPostComponent} from './common-post/common-post.component';
import {OfferingPostComponent} from './offering-post/offering-post.component';
import {JopPostComponent} from './jop-post/jop-post.component';
import {RequestPostComponent} from './request-post/request-post.component';
import {CommunityPreviewModule} from '../../community/community-preview/community-preview.module';
import {LikeModule} from '../like/like.module';
import {CommentsListModule} from '../comment/comments-list/comments-list.module';
import {UrlPreviewModule} from '../../common/url-preview/url-preview.module';
import {ImagesListModule} from '../../common/images-list/images-list.module';
import {TooltipModule} from 'primeng/tooltip';
import {PostOptionVotesComponent} from './post-option-votes/post-option-votes.component';
import {ChipsModule} from 'primeng/chips';
import {RouterModule} from '@angular/router';
import {AttributesModule} from '../../attribute/attributes.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {AttachedDocumentsModule} from '../../common/attached-documents/attached-documents.module';
import {FormsModule} from '@angular/forms';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PostItemComponent, CommonPostComponent, OfferingPostComponent, JopPostComponent, RequestPostComponent, PostOptionVotesComponent],
  imports: [
    SharedModule, UserPreviewShortModule, FavoriteButtonModule, TextShowMoreModule, ButtonModule, LocationPreviewModule,
    CompanyPreviewShortModule, CommunityPreviewModule, LikeModule, CommentsListModule, UrlPreviewModule,
    ImagesListModule, TooltipModule, ChipsModule, RouterModule, AttributesModule, ScrollPanelModule, DialogModule, ProgressBarModule,
    AttachedDocumentsModule, FormsModule, HighlightborderModule, LazyImgModule, NgxLazyElModule,
    DateAgoModule
  ],
  exports: [PostItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostItemModule { }
