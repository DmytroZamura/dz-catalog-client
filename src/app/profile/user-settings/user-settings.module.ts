import { NgModule } from '@angular/core';

import {UserSettingsComponent} from './user-settings.component';
import {SharedModule} from '../../shared/shared.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageModule} from 'primeng/message';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {RouterModule} from '@angular/router';
import {UserSettingsRoutingModule} from './user-settings-routing.module';



@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    SharedModule, UserSettingsRoutingModule, ConfirmDialogModule, ProgressSpinnerModule, MessageModule, HighlightborderModule,
    FormsModule, InputTextModule,
    SelectLocationModule, SelectCommonItemModule, CheckboxModule, ButtonModule, ProcessDialogModule, RouterModule
  ]
})
export class UserSettingsModule { }
