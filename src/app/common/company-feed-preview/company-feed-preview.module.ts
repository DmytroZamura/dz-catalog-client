import { NgModule } from '@angular/core';
import {CompanyFeedPreviewComponent} from './company-feed-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {RatingModule} from 'primeng/rating';
import {FollowCompanyButtonModule} from '../../company/follow-company-button/follow-company-button.module';
import {FavoriteButtonModule} from '../favorite-button/favorite-button.module';
import {FormsModule} from '@angular/forms';
import {LocationPreviewModule} from '../location-preview/location-preview.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CompanyFeedPreviewComponent],
  imports: [
    SharedModule, ButtonModule, RouterModule, RatingModule, FollowCompanyButtonModule, FavoriteButtonModule, FormsModule, LocationPreviewModule,
    LazyImgModule
  ],
  exports: [CompanyFeedPreviewComponent]
})
export class CompanyFeedPreviewModule { }
