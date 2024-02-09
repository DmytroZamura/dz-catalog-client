import {NgModule, Type} from '@angular/core';

import {ShowAuthDialogComponent} from './show-auth-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [ShowAuthDialogComponent],
  imports: [
   SharedModule, DialogModule, ButtonModule
  ],
  exports: [ShowAuthDialogComponent]
})
export class ShowAuthDialogModule {
  customElementComponent: Type<any> = ShowAuthDialogComponent;
}
