import { NgModule } from '@angular/core';

import {CommunityCompaniesComponent} from './community-companies.component';
import {SharedModule} from '../../shared/shared.module';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {CompanyFeedPreviewModule} from '../../common/company-feed-preview/company-feed-preview.module';



@NgModule({
  declarations: [CommunityCompaniesComponent],
  imports: [
    SharedModule, ItemsListAgileModule, ManageItemsListModule, ProcessDialogModule, CompanyFeedPreviewModule
  ],
  exports: [CommunityCompaniesComponent]
})
export class CommunityCompaniesModule { }
