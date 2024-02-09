import { NgModule } from '@angular/core';

import {SelectOrderingComponent} from './select-ordering.component';
import {SharedModule} from '../../shared/shared.module';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {MenuModule} from 'primeng/menu';



@NgModule({
  declarations: [SelectOrderingComponent],
  imports: [
    SharedModule, HighlightborderModule, MenuModule
  ],
  exports: [SelectOrderingComponent]
})
export class SelectOrderingModule { }
