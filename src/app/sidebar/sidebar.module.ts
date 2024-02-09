import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Type} from '@angular/core';

import {AppSideBarComponent} from './app.sidebar.component';
import {AppSidebartabcontentComponent} from './app.sidebartabcontent.component';
import {NavigationWidgetComponent} from './navigation-widget/navigation-widget.component';
import {SelectUserOrCompanyModule} from '../common/select-user-or-company/select-user-or-company.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {SelectCategoryModule} from '../category/select-category/select-category.module';
import {CategoriesTreeComponent} from './categories-tree/categories-tree.component';
import {UserCategoriesInfoComponent} from './user-categories-info/user-categories-info.component';
import {SelectCommonItemModule} from '../general/select-common-item/select-common-item.module';
import {ButtonModule} from 'primeng/button';
import {ProductGroupsComponent} from './product-groups/product-groups.component';
import {ProductGroupAdminComponent} from './product-group-admin/product-group-admin.component';
import {FilterAttributesModule} from '../attribute/filter-attributes/filter-attributes.module';
import {TreeModule} from 'primeng/tree';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';
import {ChatListModule} from '../messaging/chat-list/chat-list.module';
import {DeviceDetectorModule} from 'ngx-device-detector';


@NgModule({
  declarations: [AppSideBarComponent, AppSidebartabcontentComponent, NavigationWidgetComponent,
    CategoriesTreeComponent, UserCategoriesInfoComponent, ProductGroupsComponent, ProductGroupAdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule, SelectUserOrCompanyModule,
    RouterModule, NgxLazyElModule, ChatListModule,
    SelectCategoryModule, SelectCommonItemModule, ButtonModule, FilterAttributesModule, TreeModule,
    ConfirmDialogModule, InputTextModule, FormsModule, DialogModule, CheckboxModule,
    ScrollPanelModule, DeviceDetectorModule.forRoot()
  ],
  exports: [AppSideBarComponent]
})
export class SidebarModule {

  customElementComponent: Type<any> = AppSideBarComponent;
}
