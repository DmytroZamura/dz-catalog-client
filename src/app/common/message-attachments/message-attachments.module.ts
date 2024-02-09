import {NgModule, Type} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {FileModule} from '../file/file.module';
import {SelectGiphyModule} from './select-giphy/select-giphy.module';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MessageAttachmentsComponent} from './message-attachments.component';


@NgModule({
  declarations: [MessageAttachmentsComponent],
  imports: [
    SharedModule, FileModule, SelectGiphyModule,  ButtonModule, OverlayPanelModule
  ],
  exports: [MessageAttachmentsComponent]
})
export class MessageAttachmentsModule {

}
