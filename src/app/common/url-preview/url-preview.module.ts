import { NgModule } from '@angular/core';
import {UrlPreviewComponent} from './url-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {GeneralService} from '../../general/general.service';
import {RouterModule} from '@angular/router';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';




@NgModule({
  declarations: [UrlPreviewComponent],
  imports: [
    SharedModule, RouterModule, LazyImgModule
  ],
  providers: [GeneralService],
  exports: [UrlPreviewComponent]
})
export class UrlPreviewModule { }
