import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CreatePostComponent} from './create-post.component';
import {SharedModule} from '../../shared/shared.module';

import {GeneralService} from '../../general/general.service';
import {InputTextModule} from 'primeng/inputtext';
import {SelectUserOrCompanyModule} from '../../common/select-user-or-company/select-user-or-company.module';
import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';




@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    SharedModule,  InputTextModule, SelectUserOrCompanyModule, SelectLocationModule, SelectCommonItemModule,
    ProcessDialogModule, DeviceDetectorModule.forRoot(), NgxLazyElModule
  ],
  providers: [GeneralService],
  exports: [CreatePostComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePostModule { }
