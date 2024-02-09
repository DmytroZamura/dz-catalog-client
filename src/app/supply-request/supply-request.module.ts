import { NgModule } from '@angular/core';
import {SupplyRequestComponent} from './supply-request.component';
import {SupplyRequestButtonComponent} from './supply-request-button/supply-request-button.component';
import {SharedModule} from '../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {UserPreviewShortModule} from '../common/user-preview-short/user-preview-short.module';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AttachedDocumentsModule} from '../common/attached-documents/attached-documents.module';
import {SupplyRequestPositionsModule} from './supply-request-positions/supply-request-positions.module';
import {ButtonModule} from 'primeng/button';
import {ProcessDialogModule} from '../common/process-dialog/process-dialog.module';
import {CompanyPreviewShortModule} from '../common/company-preview-short/company-preview-short.module';
import {FormsModule} from '@angular/forms';
import {SelectUserOrCompanyModule} from '../common/select-user-or-company/select-user-or-company.module';



@NgModule({
  declarations: [SupplyRequestComponent, SupplyRequestButtonComponent],
  imports: [
    SharedModule, DialogModule, ScrollPanelModule,
    UserPreviewShortModule, CompanyPreviewShortModule, InputTextModule,
    InputTextareaModule, FormsModule,
    AttachedDocumentsModule, SupplyRequestPositionsModule, ButtonModule, ProcessDialogModule,
    SelectUserOrCompanyModule
  ],
  exports: [SupplyRequestButtonComponent]
})
export class SupplyRequestModule { }
