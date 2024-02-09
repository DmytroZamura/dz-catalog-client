import { NgModule } from '@angular/core';
import {CommunityButtonsComponent} from './community-buttons.component';
import {ButtonModule} from 'primeng/button';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [CommunityButtonsComponent],
  imports: [
    SharedModule, ButtonModule, ProcessDialogModule
  ],
  exports: [CommunityButtonsComponent]
})
export class CommunityButtonsModule { }
