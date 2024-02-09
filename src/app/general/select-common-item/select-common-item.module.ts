import { NgModule } from '@angular/core';

import {SelectCommonItemComponent} from './select-common-item.component';
import {SharedModule} from '../../shared/shared.module';
import {GeneralService} from '../general.service';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';




@NgModule({
  declarations: [SelectCommonItemComponent],
  imports: [
    SharedModule, DropdownModule, SelectButtonModule, HighlightborderModule, AutoCompleteModule, FormsModule, MessageModule
  ],
  exports: [SelectCommonItemComponent],
  providers: [GeneralService]
})
export class SelectCommonItemModule { }
