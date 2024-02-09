import {NgModule, Type} from '@angular/core';

import {CreateCommentComponent} from './create-comment.component';
import {SharedModule} from '../../../shared/shared.module';
import {TextEditorModule} from '../../../common/text-editor/text-editor.module';

import {UserImagePreviewModule} from '../../../common/user-image-preview/user-image-preview.module';
import {UrlPreviewModule} from '../../../common/url-preview/url-preview.module';
import {ButtonModule} from 'primeng/button';
import {MessageAttachmentsModule} from '../../../common/message-attachments/message-attachments.module';



@NgModule({
  declarations: [CreateCommentComponent],

  imports: [
    SharedModule, TextEditorModule, UserImagePreviewModule, UrlPreviewModule, ButtonModule,
    MessageAttachmentsModule
  ],
  exports: [CreateCommentComponent]
})
export class CreateCommentModule {
   customElementComponent: Type<any> = CreateCommentComponent;
}
