import { NgModule } from '@angular/core';

import {SendPostRespondComponent} from './send-post-respond.component';
import {SharedModule} from '../../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {UserPreviewShortModule} from '../../../common/user-preview-short/user-preview-short.module';
import {SelectUserOrCompanyModule} from '../../../common/select-user-or-company/select-user-or-company.module';
import {InputTextModule} from 'primeng/inputtext';
import {SelectCommonItemModule} from '../../../general/select-common-item/select-common-item.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AttachedDocumentsModule} from '../../../common/attached-documents/attached-documents.module';
import {ButtonModule} from 'primeng/button';
import {ProcessDialogModule} from '../../../common/process-dialog/process-dialog.module';
import {ResumeModule} from '../../../profile/resume/resume.module';



@NgModule({
  declarations: [SendPostRespondComponent],
  imports: [
    SharedModule, DialogModule, FormsModule, ScrollPanelModule, UserPreviewShortModule, SelectUserOrCompanyModule,
    InputTextModule, SelectCommonItemModule, InputTextareaModule, AttachedDocumentsModule, ButtonModule, ProcessDialogModule, ResumeModule
  ],
  exports: [SendPostRespondComponent]
})
export class SendPostRespondModule { }
