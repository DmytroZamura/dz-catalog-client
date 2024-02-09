import { NgModule } from '@angular/core';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import {SharedModule} from '../shared/shared.module';
import {MakePaymentDialogModule} from './payment-accounts/make-payment-dialog/make-payment-dialog.module';
import {PaymentAccountPreviewModule} from './payment-accounts/payment-account-preview/payment-account-preview.module';
import {PostPreviewModule} from '../post/post-preview/post-preview.module';
import {LazyImgModule} from '../directives/lazy-img/lazy-img.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PaymentProductPreviewModule} from './payment-product-preview/payment-product-preview.module';
import {ProcessDialogModule} from '../common/process-dialog/process-dialog.module';
import {RouterModule} from '@angular/router';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [PromotionComponent],
  imports: [
    SharedModule,
    PromotionRoutingModule,
    MakePaymentDialogModule,
    PaymentAccountPreviewModule,
    PostPreviewModule,
    LazyImgModule,
    ProgressSpinnerModule,
    PaymentProductPreviewModule,
    ProcessDialogModule,
    RouterModule,
    MessageModule
  ]
})
export class PromotionModule { }
