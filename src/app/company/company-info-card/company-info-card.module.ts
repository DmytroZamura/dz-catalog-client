import { NgModule } from '@angular/core';

import {CompanyInfoCardComponent} from './company-info-card.component';
import {SharedModule} from '../../shared/shared.module';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {FollowCompanyButtonModule} from '../follow-company-button/follow-company-button.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';



@NgModule({
  declarations: [CompanyInfoCardComponent],
  imports: [
    SharedModule, RatingModule, ButtonModule, FollowCompanyButtonModule, RouterModule, FormsModule, LocationPreviewModule
  ],
  exports: [CompanyInfoCardComponent]
})
export class CompanyInfoCardModule { }
