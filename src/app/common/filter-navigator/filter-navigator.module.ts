import { NgModule } from '@angular/core';

import {FilterNavigatorComponent} from './filter-navigator.component';
import {SharedModule} from '../../shared/shared.module';
import {CategoriesNavigatorModule} from '../../category/categories-navigator/categories-navigator.module';
import {SelectCategoryDialogModule} from '../../category/select-category-dialog/select-category-dialog.module';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {ButtonModule} from 'primeng/button';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';



@NgModule({
  declarations: [FilterNavigatorComponent],
  imports: [
    SharedModule, CategoriesNavigatorModule, SelectCategoryDialogModule, SelectCommonItemModule, ButtonModule, HighlightborderModule
  ],
  exports: [FilterNavigatorComponent]
})
export class FilterNavigatorModule { }
