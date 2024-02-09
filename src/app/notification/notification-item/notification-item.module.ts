import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NotificationItemComponent} from './notification-item.component';
import {ActorsListModule} from '../../common/actors-list/actors-list.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {PostPreviewModule} from '../../post/post-preview/post-preview.module';
import {RouterModule} from '@angular/router';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {CommunityPreviewModule} from '../../community/community-preview/community-preview.module';

import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';


@NgModule({
  declarations: [NotificationItemComponent],
  imports: [
    SharedModule, ActorsListModule, TextShowMoreModule, PostPreviewModule, RouterModule, HighlightborderModule, CompanyPreviewShortModule,
    CommunityPreviewModule, DateAgoModule
  ],
  exports: [NotificationItemComponent]
})
export class NotificationItemModule {
}
