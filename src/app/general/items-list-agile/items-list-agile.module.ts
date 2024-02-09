import { NgModule } from '@angular/core';
import {ItemsListAgileComponent} from './items-list-agile.component';
import {SharedModule} from '../../shared/shared.module';

import {AdsenseModule} from 'ng2-adsense';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {EmptyPostModule} from '../../post/empty-post/empty-post.module';

import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CopyLinkModule} from '../../common/copy-link/copy-link.module';
import {DeviceDetectorModule} from 'ngx-device-detector';

import {DeferModule} from 'primeng/defer';
import {ProgressSpinnerModule} from 'primeng/progressspinner';



@NgModule({
  declarations: [ItemsListAgileComponent],
  imports: [
    SharedModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-4091968257038599',
      adSlot: 1513385937,
    }),
    DeferModule, EmptyPostModule, ProgressSpinnerModule, ProcessDialogModule, CopyLinkModule, ConfirmDialogModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [ItemsListAgileComponent]
})
export class ItemsListAgileModule { }
