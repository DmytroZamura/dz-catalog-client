import { NgModule } from '@angular/core';
import {UserFeedPreviewComponent} from './user-feed-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {RatingModule} from 'primeng/rating';
import {FollowProfileButtonModule} from '../../profile/profile-view/follow-profile-button/follow-profile-button.module';
import {ButtonModule} from 'primeng/button';
import {LocationPreviewModule} from '../location-preview/location-preview.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [UserFeedPreviewComponent],
  imports: [
    SharedModule, RatingModule, FollowProfileButtonModule, ButtonModule, LocationPreviewModule, RouterModule, FormsModule, LazyImgModule
  ],
  exports: [UserFeedPreviewComponent]
})
export class UserFeedPreviewModule { }
