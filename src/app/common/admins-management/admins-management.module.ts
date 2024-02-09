import { NgModule } from '@angular/core';
import {AdminsManagementComponent} from './admins-management.component';
import {SharedModule} from '../../shared/shared.module';
import {SelectProfileModule} from '../../profile/select-profile/select-profile.module';
import {ProcessDialogModule} from '../process-dialog/process-dialog.module';
import {AddUserModule} from '../../profile/add-user/add-user.module';
import {ToolbarModule} from 'primeng/toolbar';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {UserFeedPreviewModule} from '../user-feed-preview/user-feed-preview.module';



@NgModule({
  declarations: [AdminsManagementComponent],
  imports: [
    SharedModule, SelectProfileModule, ProcessDialogModule, AddUserModule, ToolbarModule,
    ItemsListAgileModule, ManageItemsListModule, UserFeedPreviewModule
  ],
  exports: [AdminsManagementComponent]
})
export class AdminsManagementModule { }
