import { NgModule, Type} from '@angular/core';
import {ChatComponent} from './chat.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {SharedModule} from '../../shared/shared.module';
import {AngularSplitModule} from 'angular-split';
import {InfscrollModule} from '../../directives/infscroll/infscroll.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TextEditorModule} from '../../common/text-editor/text-editor.module';
import {MessageAttachmentsModule} from '../../common/message-attachments/message-attachments.module';
import {ButtonModule} from 'primeng/button';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {GeneralService} from '../../general/general.service';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {CompanyUserPreviewShortModule} from '../../common/company-user-preview-short/company-user-preview-short.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';




@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [
    SharedModule, AngularSplitModule.forRoot(), InfscrollModule, ProgressSpinnerModule, TextEditorModule, MessageAttachmentsModule,
    ButtonModule, HighlightborderModule,
    CompanyPreviewShortModule, UserPreviewShortModule, CompanyUserPreviewShortModule, TextShowMoreModule, DateAgoModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [GeneralService],
  exports: [ChatComponent]
})
export class ChatModule {
  customElementComponent: Type<any> = ChatComponent;
}
