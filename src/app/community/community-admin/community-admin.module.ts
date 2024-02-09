import {NgModule} from '@angular/core';

import {CommunityAdminRoutingModule} from './community-admin-routing.module';

import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RouterModule} from '@angular/router';
import {TabMenuModule} from 'primeng/tabmenu';
import {CommunityAdminComponent} from './community-admin.component';
import {CommunityOverviewAdminComponent} from './community-overview-admin/community-overview-admin.component';
import {AdminsManagementModule} from '../../common/admins-management/admins-management.module';
import {CommunityCategoriesComponent} from './community-categories/community-categories.component';
import {CommunityMembersModule} from '../community-members/community-members.module';
import {CommunityCompaniesModule} from '../community-companies/community-companies.module';
import {CommunityInvitationsModule} from '../community-invitations/community-invitations.module';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {ButtonModule} from 'primeng/button';
import {FileModule} from '../../common/file/file.module';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {ChipsModule} from 'primeng/chips';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {SelectMultipleCategoriesModule} from '../../category/select-multiple-categories/select-multiple-categories.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DeviceDetectorModule} from 'ngx-device-detector';


@NgModule({
  declarations: [CommunityAdminComponent, CommunityOverviewAdminComponent, CommunityCategoriesComponent],
  imports: [
    SharedModule,
    CommunityAdminRoutingModule, FormsModule, ProgressSpinnerModule, RouterModule, TabMenuModule, AdminsManagementModule,
    CommunityMembersModule, CommunityCompaniesModule, CommunityInvitationsModule,
    FormsModule,
    SelectCommonItemModule,
    ButtonModule,
    FileModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    SelectLocationModule,
    ChipsModule,
    ProcessDialogModule,
    SelectMultipleCategoriesModule,
    ConfirmDialogModule,
    DeviceDetectorModule.forRoot()
  ]
})
export class CommunityAdminModule {
}
