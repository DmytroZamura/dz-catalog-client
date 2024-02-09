import { NgModule } from '@angular/core';

import { UserCompanyRoutingModule } from './user-company-routing.module';
import {UserCompanyComponent} from './user-company.component';
import {SharedModule} from '../../shared/shared.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';




@NgModule({
  declarations: [UserCompanyComponent],
  imports: [
    SharedModule,
    UserCompanyRoutingModule,
    PanelModule,
    ButtonModule,
    CompanyPreviewShortModule
  ]
})
export class UserCompanyModule { }
