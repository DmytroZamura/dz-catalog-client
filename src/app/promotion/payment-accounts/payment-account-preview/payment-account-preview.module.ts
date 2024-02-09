import { NgModule } from '@angular/core';
import {PaymentAccountPreviewComponent} from './payment-account-preview.component';
import {SharedModule} from '../../../shared/shared.module';
import {CompanyPreviewShortModule} from '../../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../../common/user-preview-short/user-preview-short.module';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PaymentAccountPreviewComponent],
  imports: [
    SharedModule,
    CompanyPreviewShortModule,
    UserPreviewShortModule,
    ButtonModule,
    RouterModule
  ],
  exports: [PaymentAccountPreviewComponent]
})
export class PaymentAccountPreviewModule { }
