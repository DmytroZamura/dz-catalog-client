import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {UserOverviewAdminComponent} from './user-overview-admin/user-overview-admin.component';
import {UserPostsAdminComponent} from './user-posts-admin/user-posts-admin.component';
import {UserProductsAdminComponent} from './user-products-admin/user-products-admin.component';
import {SelectCommonItemModule} from '../general/select-common-item/select-common-item.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {FileModule} from '../common/file/file.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectLocationModule} from '../general/select-location/select-location.module';
import {TextEditorModule} from '../common/text-editor/text-editor.module';
import {UserEmploymentModule} from './user-employment/user-employment.module';
import {PanelModule} from 'primeng/panel';

import {SelectMultipleCategoriesModule} from '../category/select-multiple-categories/select-multiple-categories.module';
import {ResumeModule} from './resume/resume.module';
import {CreatePostModule} from '../post/create-post/create-post.module';
import {FilterNavigatorModule} from '../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../post/filtered-posts-list/filtered-posts-list.module';
import {HighlightborderModule} from '../directives/highlightborder/highlightborder.module';
import {SelectMultipleCountriesModule} from '../general/select-multiple-countries/select-multiple-countries.module';
import {SharedModule} from '../shared/shared.module';
import {ChipsModule} from 'primeng/chips';
import {ProfileCountriesInterestModule} from './profile-counties-interest/profile-countries-interest.module';
import {ProfileCategoriesModule} from './profile-categories/profile-categories.module';
import {ItemsListAgileModule} from '../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../general/manage-items-list/manage-items-list.module';
import {ProductItemModule} from '../product/product-item/product-item.module';



@NgModule({
  declarations: [ProfileComponent, UserOverviewAdminComponent, UserPostsAdminComponent,
    UserProductsAdminComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule, ProgressSpinnerModule,
    TabMenuModule,
    SelectCommonItemModule,
    FormsModule,
    ButtonModule, FileModule, InputTextareaModule, SelectLocationModule, TextEditorModule,
    UserEmploymentModule, PanelModule, SelectMultipleCategoriesModule, SelectMultipleCountriesModule, ResumeModule,
    CreatePostModule, FilterNavigatorModule, FilteredPostsListModule, HighlightborderModule, ChipsModule,
    ProfileCountriesInterestModule, ProfileCategoriesModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    ProductItemModule

  ]
})
export class ProfileModule { }
