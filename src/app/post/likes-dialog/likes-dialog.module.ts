import { NgModule } from '@angular/core';
import { LikesDialogComponent } from './likes-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';



@NgModule({
  declarations: [LikesDialogComponent],
  imports: [
    SharedModule, DialogModule, ScrollPanelModule, ItemsListAgileModule, UserPreviewShortModule
  ],
  exports: [LikesDialogComponent]
})
export class LikesDialogModule { }
