import {NgModule, Type} from '@angular/core';
import { WelcomeDialogComponent } from './welcome-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';





@NgModule({
  declarations: [WelcomeDialogComponent],
  imports: [
    SharedModule, DialogModule, ButtonModule
  ],
  exports: [WelcomeDialogComponent]
})
export class WelcomeDialogModule {
   customElementComponent: Type<any> = WelcomeDialogComponent;
}
