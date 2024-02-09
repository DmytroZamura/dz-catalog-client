import { NgModule } from '@angular/core';

import { CommunitiesHomeRoutingModule } from './communities-home-routing.module';
import {CommunitiesHomeComponent} from './communities-home.component';
import {CreateCommunityComponent} from './create-community/create-community.component';
import {SharedModule} from '../../shared/shared.module';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FileModule} from '../../common/file/file.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectLocationModule} from '../../general/select-location/select-location.module';
import {ButtonModule} from 'primeng/button';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {CommunityItemModule} from '../community-item/community-item.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';




@NgModule({
  declarations: [CommunitiesHomeComponent, CreateCommunityComponent],
  imports: [
    SharedModule,
    CommunitiesHomeRoutingModule,
    HighlightborderModule,
    DialogModule,
    FormsModule,
    ScrollPanelModule,
    FileModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    SelectLocationModule,
    ButtonModule,
    ItemsListAgileModule,
    CommunityItemModule,
    ManageItemsListModule
  ]
})
export class CommunitiesHomeModule { }
