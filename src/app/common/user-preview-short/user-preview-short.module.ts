import { NgModule } from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {PreviewOverlayPanelModule} from '../preview-overlay-panel/preview-overlay-panel.module';
import {RatingModule} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {UserPreviewShortComponent} from './user-preview-short.component';
import {TextShowMoreModule} from '../text-show-more/text-show-more.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [UserPreviewShortComponent],
  imports: [
    SharedModule, PreviewOverlayPanelModule, RatingModule, FormsModule, TextShowMoreModule, LazyImgModule
  ],
  exports: [UserPreviewShortComponent]
})
export class UserPreviewShortModule { }
