import { NgModule } from '@angular/core';
import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import {PaymentAccountPreviewModule} from '../payment-accounts/payment-account-preview/payment-account-preview.module';
import {SharedModule} from '../../shared/shared.module';
import {MakePaymentDialogModule} from '../payment-accounts/make-payment-dialog/make-payment-dialog.module';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {PaymentOrderItemModule} from '../payment-order-item/payment-order-item.module';
import {PaymentItemModule} from '../payment-item/payment-item.module';


@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    SharedModule,
    AccountDetailsRoutingModule,
    PaymentAccountPreviewModule,
    MakePaymentDialogModule,
    MessageModule,
    ProgressSpinnerModule,
    TabMenuModule,
    ItemsListAgileModule,
    PaymentOrderItemModule,
    PaymentItemModule
  ]
})
export class AccountDetailsModule { }
