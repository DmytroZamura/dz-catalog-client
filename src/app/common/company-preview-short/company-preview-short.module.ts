import { NgModule } from '@angular/core';
import {CompanyPreviewShortComponent} from './company-preview-short.component';
import {SharedModule} from '../../shared/shared.module';
import {PreviewOverlayPanelModule} from '../preview-overlay-panel/preview-overlay-panel.module';
import {RatingModule} from 'primeng/rating';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CompanyPreviewShortComponent],
  imports: [
    SharedModule, PreviewOverlayPanelModule, RatingModule, RouterModule, FormsModule,
    LazyImgModule
  ],
  exports: [CompanyPreviewShortComponent]
})
export class CompanyPreviewShortModule { }
