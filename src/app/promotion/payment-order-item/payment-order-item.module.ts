import { NgModule } from '@angular/core';
import {PaymentOrderItemComponent} from './payment-order-item.component';
import {SharedModule} from '../../shared/shared.module';
import {PostPreviewModule} from '../../post/post-preview/post-preview.module';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PaymentOrderItemComponent],
  imports: [
    SharedModule,
    PostPreviewModule,
    DateAgoModule
  ],
  exports: [PaymentOrderItemComponent]
})
export class PaymentOrderItemModule { }
