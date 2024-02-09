import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesNavigatorComponent} from './categories-navigator.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CategoryItemBigComponent} from './category-item-big/category-item-big.component';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CategoriesNavigatorComponent, CategoryItemBigComponent],
  imports: [
    CommonModule, BreadcrumbModule, HighlightborderModule, LazyImgModule
  ],
  exports: [CategoriesNavigatorComponent]
})
export class CategoriesNavigatorModule { }
