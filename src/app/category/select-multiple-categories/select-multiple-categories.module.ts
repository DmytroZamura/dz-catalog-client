import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectMultipleCategoriesComponent} from './select-multiple-categories.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SelectCategoryDialogModule} from '../select-category-dialog/select-category-dialog.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectMultipleCategoriesComponent],
  imports: [
    CommonModule, AutoCompleteModule, SelectCategoryDialogModule, FormsModule
  ],
  exports: [SelectMultipleCategoriesComponent]
})
export class SelectMultipleCategoriesModule { }
