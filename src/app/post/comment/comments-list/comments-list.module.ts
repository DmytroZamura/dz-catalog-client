import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';


import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProcessDialogModule} from '../../../common/process-dialog/process-dialog.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CommentsListComponent} from './comments-list.component';
import {CommentComponent} from '../comment.component';
import {LikeModule} from '../../like/like.module';
import {UserPreviewShortModule} from '../../../common/user-preview-short/user-preview-short.module';
import {TextShowMoreModule} from '../../../common/text-show-more/text-show-more.module';
import {UserImagePreviewModule} from '../../../common/user-image-preview/user-image-preview.module';
import {UrlPreviewModule} from '../../../common/url-preview/url-preview.module';
import {DateAgoModule} from '../../../pipes/date-ago/date-ago.module';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';



@NgModule({
  declarations: [CommentsListComponent, CommentComponent],
  imports: [
    SharedModule,  ProgressSpinnerModule, ProcessDialogModule, ConfirmDialogModule, LikeModule,
    UserPreviewShortModule, TextShowMoreModule, UserImagePreviewModule, UrlPreviewModule, DateAgoModule,
    NgxLazyElModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CommentsListComponent]
})
export class CommentsListModule { }
