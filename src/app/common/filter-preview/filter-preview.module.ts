import { NgModule } from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {FilterPreviewComponent} from './filter-preview.component';



@NgModule({
  declarations: [FilterPreviewComponent],
  imports: [
    SharedModule
  ],
  exports: [FilterPreviewComponent]
})
export class FilterPreviewModule { }
