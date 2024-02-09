import { NgModule } from '@angular/core';

import {SelectCategoryDialogComponent} from './select-category-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {SuggestCategoryDialogComponent} from './suggest-category-dialog/suggest-category-dialog.component';
import {DialogModule} from 'primeng/dialog';
import {CategoriesNavigatorModule} from '../categories-navigator/categories-navigator.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DeviceDetectorModule} from 'ngx-device-detector';



@NgModule({
  declarations: [SelectCategoryDialogComponent, SuggestCategoryDialogComponent],
  imports: [
    SharedModule, DialogModule, CategoriesNavigatorModule, ScrollPanelModule, ProgressSpinnerModule,
    HighlightborderModule, FormsModule, ButtonModule, InputTextModule, DeviceDetectorModule.forRoot()
  ],
  exports: [SelectCategoryDialogComponent]
})
export class SelectCategoryDialogModule { }
