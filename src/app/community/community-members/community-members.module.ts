import {NgModule} from '@angular/core';

import {CommunityMembersComponent} from './community-members.component';
import {SharedModule} from '../../shared/shared.module';

import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {UserFeedPreviewModule} from '../../common/user-feed-preview/user-feed-preview.module';


@NgModule({
  declarations: [CommunityMembersComponent],
  imports: [
    SharedModule, ProcessDialogModule,
    ItemsListAgileModule, ManageItemsListModule, UserFeedPreviewModule
  ],
  exports: [CommunityMembersComponent]
})
export class CommunityMembersModule {
}
