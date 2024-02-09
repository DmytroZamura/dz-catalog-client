import {NgModule, Type} from '@angular/core';

import {NotificationComponent} from './notification.component';
import {NotificationItemModule} from './notification-item/notification-item.module';
import {SharedModule} from '../shared/shared.module';
import {ToastModule} from 'primeng/toast';
import {GeneralService} from '../general/general.service';









@NgModule({
  declarations: [NotificationComponent],
  imports: [
    SharedModule, NotificationItemModule, ToastModule
  ],
  providers: [GeneralService],

  exports: [NotificationComponent]
})
export class NotificationModule {
   customElementComponent: Type<any> = NotificationComponent;
}
