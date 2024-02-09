import { NgModule } from '@angular/core';
import {CompanyUserPreviewShortComponent} from './company-user-preview-short.component';
import {SharedModule} from '../../shared/shared.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CompanyUserPreviewShortComponent],
  imports: [
    SharedModule,
    LazyImgModule
  ],
  exports: [CompanyUserPreviewShortComponent]
})
export class CompanyUserPreviewShortModule { }
