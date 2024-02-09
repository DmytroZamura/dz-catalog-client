import { NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {QuillModule} from 'ngx-quill';
import {TextEditorComponent} from './text-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageAttachmentsModule} from '../message-attachments/message-attachments.module';


import Quill from 'quill';
import AutoLinks from 'quill-auto-links';

if (Quill) {
  Quill.register('modules/autoLinks', AutoLinks);
}

@NgModule({
  declarations: [TextEditorComponent],

  imports: [
    SharedModule,

    QuillModule.forRoot(), FormsModule,
    ReactiveFormsModule,
    MessageAttachmentsModule

  ],
  exports: [TextEditorComponent]
})
export class TextEditorModule {

}
