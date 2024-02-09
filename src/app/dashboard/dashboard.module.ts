import { NgModule } from '@angular/core';
import {GeneralDetailsBoardComponent} from './general-details-board/general-details-board.component';
import {SharedModule} from '../shared/shared.module';
import {UserPreviewShortModule} from '../common/user-preview-short/user-preview-short.module';
import {CompanyPreviewShortModule} from '../common/company-preview-short/company-preview-short.module';
import {HighlightborderModule} from '../directives/highlightborder/highlightborder.module';
import {RouterModule} from '@angular/router';
import {LazyImgModule} from '../directives/lazy-img/lazy-img.module';
import { UserDashboardsComponent } from './user-dashboards/user-dashboards.component';



@NgModule({
  declarations: [GeneralDetailsBoardComponent, UserDashboardsComponent],
  imports: [
    SharedModule, UserPreviewShortModule, CompanyPreviewShortModule, HighlightborderModule, RouterModule, LazyImgModule
  ],
  exports: [GeneralDetailsBoardComponent, UserDashboardsComponent]
})
export class DashboardModule { }
