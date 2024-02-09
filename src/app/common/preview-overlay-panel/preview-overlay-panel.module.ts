import { NgModule } from '@angular/core';

import {PreviewOverlayPanelComponent} from './preview-overlay-panel.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {UserFeedPreviewModule} from '../user-feed-preview/user-feed-preview.module';
import {CompanyInfoCardModule} from '../../company/company-info-card/company-info-card.module';
import {ProductInfoCardModule} from '../../product/product-info-card/product-info-card.module';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [PreviewOverlayPanelComponent],
  imports: [
    CommonModule, OverlayPanelModule, UserFeedPreviewModule, CompanyInfoCardModule, ProductInfoCardModule
  ],
  exports: [PreviewOverlayPanelComponent]
})
export class PreviewOverlayPanelModule { }
