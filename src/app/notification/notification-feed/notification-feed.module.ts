import {NgModule, Type} from '@angular/core';
import {NotificationFeedComponent} from './notification-feed.component';
import {NotificationItemModule} from '../notification-item/notification-item.module';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GeneralService} from '../../general/general.service';
import {DeviceDetectorModule} from 'ngx-device-detector';



@NgModule({
  declarations: [NotificationFeedComponent],
  imports: [
    SharedModule, NotificationItemModule, SidebarModule, ButtonModule, ProgressSpinnerModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [GeneralService],
  exports: [NotificationFeedComponent]
})
export class NotificationFeedModule {
   customElementComponent: Type<any> = NotificationFeedComponent;
}
