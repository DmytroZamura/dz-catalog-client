import {NgModule, Type} from '@angular/core';

import {ChatListComponent} from './chat-list.component';
import {SearchBoxModule} from '../../common/search-box/search-box.module';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../../shared/shared.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MenuModule} from 'primeng/menu';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';




@NgModule({
  declarations: [ChatListComponent],
  imports: [
    SharedModule, SearchBoxModule, ButtonModule, CompanyPreviewShortModule, UserPreviewShortModule, ProgressSpinnerModule, MenuModule,
    DateAgoModule
  ],
  exports: [ChatListComponent]
})
export class ChatListModule {
    customElementComponent: Type<any> = ChatListComponent;
}
