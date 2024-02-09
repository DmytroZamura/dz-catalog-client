import { NgModule } from '@angular/core';
import {UserEmploymentComponent} from './user-employment.component';
import {EditUserEmploymentComponent} from './edit-user-employment/edit-user-employment.component';
import {SharedModule} from '../../shared/shared.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {LocationPreviewModule} from '../../common/location-preview/location-preview.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {SelectCompanyModule} from '../../company/select-company/select-company.module';

import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {TextEditorModule} from '../../common/text-editor/text-editor.module';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [UserEmploymentComponent, EditUserEmploymentComponent],
  imports: [
    SharedModule, PanelModule, ButtonModule, RouterModule, LocationPreviewModule, TextShowMoreModule,
    SelectCompanyModule,  SelectLocationModule, CheckboxModule, CalendarModule, TextEditorModule, FormsModule,
    InputTextModule,
    LazyImgModule
  ],
  exports: [UserEmploymentComponent]
})
export class UserEmploymentModule { }
