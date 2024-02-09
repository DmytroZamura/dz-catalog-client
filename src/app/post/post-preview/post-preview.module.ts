import { NgModule } from '@angular/core';

import {PostPreviewComponent} from './post-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {RouterModule} from '@angular/router';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';
import {TooltipModule} from 'primeng/tooltip';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PostPreviewComponent],
  imports: [
    SharedModule, LocationPreviewModule, RouterModule, TextShowMoreModule, LazyImgModule, TooltipModule, DateAgoModule
  ],
  exports: [PostPreviewComponent]
})
export class PostPreviewModule { }
