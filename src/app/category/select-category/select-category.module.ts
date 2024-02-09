import { NgModule } from '@angular/core';

import {SelectCategoryComponent} from './select-category.component';
import {SharedModule} from '../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MessageModule} from 'primeng/message';
import {SelectCategoryDialogModule} from '../select-category-dialog/select-category-dialog.module';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [SelectCategoryComponent],
  imports: [
    SharedModule, AutoCompleteModule, MessageModule, SelectCategoryDialogModule, FormsModule
  ],
  exports: [SelectCategoryComponent]
})
export class SelectCategoryModule { }
