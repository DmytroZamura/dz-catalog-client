import { NgModule } from '@angular/core';
import {PaymentItemComponent} from './payment-item.component';
import {SharedModule} from '../../shared/shared.module';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PaymentItemComponent],
  imports: [
    SharedModule, DateAgoModule
  ],
  exports: [PaymentItemComponent]
})
export class PaymentItemModule { }
