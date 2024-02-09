import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {SearchBoxComponent} from './search-box.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

import {OverlayPanelModule} from 'primeng/overlaypanel';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    SharedModule, ReactiveFormsModule, InputTextModule, OverlayPanelModule, HighlightborderModule, ButtonModule
  ],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule { }
