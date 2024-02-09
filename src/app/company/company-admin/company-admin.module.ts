import { NgModule } from '@angular/core';


import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import {CompanyAdminComponent} from './company-admin.component';
import {SharedModule} from '../../shared/shared.module';
import {CompanyOverviewAdminComponent} from './company-overview-admin/company-overview-admin.component';
import {CompanyPostsAdminComponent} from './company-posts-admin/company-posts-admin.component';
import {CompanyProductsAdminComponent} from './company-products-admin/company-products-admin.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {AdminsManagementModule} from '../../common/admins-management/admins-management.module';
import {FormsModule} from '@angular/forms';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {ButtonModule} from 'primeng/button';
import {FileModule} from '../../common/file/file.module';
import {InputTextModule} from 'primeng/inputtext';
import {TextEditorModule} from '../../common/text-editor/text-editor.module';
import { InputMaskModule} from 'primeng/inputmask';
import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {ChipsModule} from 'primeng/chips';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';

import {FilteredPostsListModule} from '../../post/filtered-posts-list/filtered-posts-list.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../../product/product-item/product-item.module';



@NgModule({
  declarations: [CompanyAdminComponent, CompanyOverviewAdminComponent, CompanyPostsAdminComponent, CompanyProductsAdminComponent],
  imports: [
    SharedModule,
    CompanyAdminRoutingModule,
    ProgressSpinnerModule,
    TabMenuModule,
    AdminsManagementModule,
    FormsModule,
    SelectCommonItemModule,
    ButtonModule,
    FileModule,
    InputTextModule,
    TextEditorModule,
    InputMaskModule,
    SelectLocationModule,
    ChipsModule,
    ProcessDialogModule,
    CreatePostModule,
    FilterNavigatorModule,
    HighlightborderModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule,
    FilteredPostsListModule,
    ConfirmDialogModule,
    DeviceDetectorModule.forRoot()
  ]
})
export class CompanyAdminModule { }
