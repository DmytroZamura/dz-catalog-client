import { NgModule } from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {UserFeedPreviewModule} from '../../common/user-feed-preview/user-feed-preview.module';
import {CompanyFeedPreviewModule} from '../../common/company-feed-preview/company-feed-preview.module';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CommunityInvitationsComponent} from './community-invitations.component';



@NgModule({
  declarations: [CommunityInvitationsComponent],
  imports: [
    SharedModule, UserFeedPreviewModule, CompanyFeedPreviewModule, ProcessDialogModule
  ],
  exports: [CommunityInvitationsComponent]
})
export class CommunityInvitationsModule { }
