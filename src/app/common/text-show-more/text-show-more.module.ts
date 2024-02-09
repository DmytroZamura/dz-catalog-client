import { NgModule } from '@angular/core';
import {TextShowMoreComponent} from './text-show-more.component';

import {SharedModule} from '../../shared/shared.module';
import {RouteTransformerModule} from '../../directives/route-transformer/route-transformer.module';
import {MentionPreviewComponent} from './mention/mention-preview/mention-preview.component';
import {PreviewOverlayPanelModule} from '../preview-overlay-panel/preview-overlay-panel.module';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';




@NgModule({
  declarations: [TextShowMoreComponent, MentionPreviewComponent],
  imports: [
    SharedModule, RouteTransformerModule, PreviewOverlayPanelModule, SafeHtmlModule
  ],
  exports: [TextShowMoreComponent]
})
export class TextShowMoreModule { }
