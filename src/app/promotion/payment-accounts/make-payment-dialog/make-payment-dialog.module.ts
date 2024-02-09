import { NgModule } from '@angular/core';
import { MakePaymentDialogComponent } from './make-payment-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';

import {InputNumberModule} from 'primeng/inputnumber';
import {ProcessDialogModule} from '../../../common/process-dialog/process-dialog.module';




@NgModule({
  declarations: [MakePaymentDialogComponent],
  imports: [
    SharedModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    ProcessDialogModule

  ],
  exports: [MakePaymentDialogComponent]
})
export class MakePaymentDialogModule { }
