import { NgModule } from '@angular/core';
import { ManageItemsListComponent } from './manage-items-list.component';
import {SharedModule} from '../../shared/shared.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {SearchBoxModule} from '../../common/search-box/search-box.module';
import {SelectOrderingModule} from '../../common/select-ordering/select-ordering.module';
import {LikesDialogModule} from '../../post/likes-dialog/likes-dialog.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {JoyrideModule} from 'ngx-joyride';



@NgModule({
  declarations: [ManageItemsListComponent],
  imports: [
    SharedModule, FilterNavigatorModule, SearchBoxModule, SelectOrderingModule, LikesDialogModule,
    DeviceDetectorModule.forRoot(),  JoyrideModule.forChild()
  ],
  exports: [ManageItemsListComponent]
})
export class ManageItemsListModule { }
