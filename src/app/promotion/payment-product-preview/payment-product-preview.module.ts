import {NgModule} from '@angular/core';
import {PaymentProductPreviewComponent} from './payment-product-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [PaymentProductPreviewComponent],
  imports: [
    SharedModule, LazyImgModule, TextShowMoreModule,
    FormsModule,
    InputNumberModule,
    ButtonModule
  ],
  exports: [PaymentProductPreviewComponent]
})
export class PaymentProductPreviewModule {
}
