import { NgModule } from '@angular/core';

import {CommunityPreviewComponent} from './community-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CommunityPreviewComponent],
  imports: [
    SharedModule, RouterModule, LazyImgModule
  ],
  exports: [CommunityPreviewComponent]
})
export class CommunityPreviewModule { }
