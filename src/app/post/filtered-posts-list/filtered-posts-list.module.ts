import { NgModule } from '@angular/core';

import {FilteredPostsListComponent} from './filtered-posts-list.component';
import {SharedModule} from '../../shared/shared.module';
import {PostItemModule} from '../post-item/post-item.module';
import {AdsenseModule} from 'ng2-adsense';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {FilterPreviewModule} from '../../common/filter-preview/filter-preview.module';
import {RouterModule} from '@angular/router';
import {CompanyFeedPreviewModule} from '../../common/company-feed-preview/company-feed-preview.module';
import {DeferModule} from 'primeng/defer';
import {EmptyPostModule} from '../empty-post/empty-post.module';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CopyLinkModule} from '../../common/copy-link/copy-link.module';
import {LikesDialogModule} from '../likes-dialog/likes-dialog.module';
import {SendPostRespondModule} from '../respond/send-post-respond/send-post-respond.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DeviceDetectorModule} from 'ngx-device-detector';

import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';




@NgModule({
  declarations: [FilteredPostsListComponent],
  imports: [
    SharedModule, PostItemModule, AdsenseModule, UserPreviewShortModule, FilterPreviewModule, RouterModule, CompanyFeedPreviewModule,
    DeferModule, EmptyPostModule, ProcessDialogModule, CopyLinkModule, LikesDialogModule, SendPostRespondModule, ConfirmDialogModule,
   DateAgoModule,
    DeviceDetectorModule.forRoot()

  ],
  exports: [FilteredPostsListComponent]
})
export class FilteredPostsListModule { }
