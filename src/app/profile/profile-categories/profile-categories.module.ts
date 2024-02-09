import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileCategoriesComponent} from './profile-categories.component';
import {SelectMultipleCategoriesModule} from '../../category/select-multiple-categories/select-multiple-categories.module';



@NgModule({
  declarations: [ProfileCategoriesComponent],
  imports: [
    CommonModule, SelectMultipleCategoriesModule
  ],
  exports: [ProfileCategoriesComponent]
})
export class ProfileCategoriesModule { }
