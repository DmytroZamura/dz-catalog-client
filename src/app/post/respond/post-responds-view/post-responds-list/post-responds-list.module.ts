import { NgModule } from '@angular/core';
import {PostRespondsListComponent} from './post-responds-list.component';
import {PostRespondComponent} from './post-respond/post-respond.component';
import {SharedModule} from '../../../../shared/shared.module';
import {DeferModule} from 'primeng/defer';
import {EmptyPostModule} from '../../../empty-post/empty-post.module';
import {RouterModule} from '@angular/router';
import {RatingModule} from 'primeng/rating';
import {UserPreviewShortModule} from '../../../../common/user-preview-short/user-preview-short.module';
import {CompanyUserPreviewShortModule} from '../../../../common/company-user-preview-short/company-user-preview-short.module';
import {AttachedDocumentsModule} from '../../../../common/attached-documents/attached-documents.module';
import {TextShowMoreModule} from '../../../../common/text-show-more/text-show-more.module';
import {InplaceTextEditorModule} from '../../../../common/inplace-text-editor/inplace-text-editor.module';
import {SelectCommonItemModule} from '../../../../general/select-common-item/select-common-item.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

import {DateAgoModule} from '../../../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PostRespondsListComponent, PostRespondComponent],
  imports: [
    SharedModule, DeferModule, EmptyPostModule, RouterModule, RatingModule, UserPreviewShortModule, CompanyUserPreviewShortModule,
    AttachedDocumentsModule, TextShowMoreModule, InplaceTextEditorModule, SelectCommonItemModule, FormsModule, ButtonModule, DateAgoModule
  ],
  exports: [PostRespondsListComponent]
})
export class PostRespondsListModule { }
