import {NgModule} from '@angular/core';
import {ProductAdminRoutingModule} from './product-admin-routing.module';
import {ProductAdminComponent} from './product-admin.component';
import {ProductOverviewAdminComponent} from './product-overview-admin/product-overview-admin.component';
import {ProductPostsAdminComponent} from './product-posts-admin/product-posts-admin.component';
import {SharedModule} from '../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FormsModule} from '@angular/forms';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {SelectCategoryModule} from '../../category/select-category/select-category.module';
import {SelectProductGroupModule} from '../../general/wizards/product-wizard/select-product-group/select-product-group.module';
import {TextEditorModule} from '../../common/text-editor/text-editor.module';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {AttributesModule} from '../../attribute/attributes.module';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {ProductImageViewModule} from '../product-image/product-image-view/product-image-view.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {PostItemModule} from '../../post/post-item/post-item.module';
import {SendPostRespondModule} from '../../post/respond/send-post-respond/send-post-respond.module';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';


@NgModule({
  declarations: [ProductAdminComponent, ProductOverviewAdminComponent, ProductPostsAdminComponent],
  imports: [
    SharedModule,
    ProductAdminRoutingModule,
    ProgressSpinnerModule,
    TabMenuModule,
    ConfirmDialogModule,
    FormsModule,
    SelectCommonItemModule,
    RouterModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    SelectCategoryModule,
    SelectProductGroupModule,
    TextEditorModule,
    CheckboxModule,
    CalendarModule,
    ChipsModule,
    AttributesModule,
    ProcessDialogModule,
    CreatePostModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    PostItemModule,
    SendPostRespondModule,
    DateAgoModule,

    ProductImageViewModule,
    DeviceDetectorModule.forRoot()
  ]
})
export class ProductAdminModule {
}
