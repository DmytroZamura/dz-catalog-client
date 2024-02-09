import { NgModule } from '@angular/core';

import {ActorsListComponent} from './actors-list.component';
import {SharedModule} from '../../shared/shared.module';
import {CompanyPreviewShortModule} from '../company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../user-preview-short/user-preview-short.module';



@NgModule({
  declarations: [ActorsListComponent],
  imports: [
    SharedModule, CompanyPreviewShortModule, UserPreviewShortModule
  ],
  exports: [ActorsListComponent]
})
export class ActorsListModule { }
