import {NgModule} from '@angular/core';

import {MessageDialogComponent} from './message-dialog.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TextEditorModule} from '../text-editor/text-editor.module';
import {SharedModule} from '../../shared/shared.module';

import {MessageAttachmentsModule} from '../message-attachments/message-attachments.module';


@NgModule({
  declarations: [MessageDialogComponent],
  imports: [
    SharedModule, DialogModule, ButtonModule, ScrollPanelModule, TextEditorModule,
    MessageAttachmentsModule
  ],
  exports: [MessageDialogComponent]
})
export class MessageDialogModule {
}
