import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentAccountsRoutingModule} from './payment-accounts-routing.module';
import {PaymentAccountsComponent} from './payment-accounts.component';
import {TranslateModule} from '@ngx-translate/core';

import {MakePaymentDialogModule} from './make-payment-dialog/make-payment-dialog.module';
import {PaymentAccountPreviewModule} from './payment-account-preview/payment-account-preview.module';
import {MessageModule} from 'primeng/message';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PaymentAccountsComponent],
  imports: [
    CommonModule,
    PaymentAccountsRoutingModule,

    TranslateModule,
    MakePaymentDialogModule,
    PaymentAccountPreviewModule,
    MessageModule,
    RouterModule
  ]
})
export class PaymentAccountsModule {
}
