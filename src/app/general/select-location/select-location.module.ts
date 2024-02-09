import { NgModule } from '@angular/core';

import {SelectLocationComponent} from './select-location.component';
import {SharedModule} from '../../shared/shared.module';
import {GeneralService} from '../general.service';
import {SelectCommonItemModule} from '../select-common-item/select-common-item.module';



@NgModule({
  declarations: [SelectLocationComponent],
  imports: [
    SharedModule, SelectCommonItemModule
  ],
  exports: [SelectLocationComponent],
  providers: [GeneralService]
})
export class SelectLocationModule { }
