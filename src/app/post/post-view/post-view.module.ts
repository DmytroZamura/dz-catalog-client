import { NgModule } from '@angular/core';

import { PostViewRoutingModule } from './post-view-routing.module';
import {PostViewComponent} from './post-view.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PostItemModule} from '../post-item/post-item.module';
import {SearchBoxModule} from '../../common/search-box/search-box.module';
import {SelectOrderingModule} from '../../common/select-ordering/select-ordering.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {PostRespondsListModule} from '../respond/post-responds-view/post-responds-list/post-responds-list.module';
import {EmptyPostModule} from '../empty-post/empty-post.module';
import {PostPreviewModule} from '../post-preview/post-preview.module';
import {AdsenseModule} from 'ng2-adsense';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {CopyLinkModule} from '../../common/copy-link/copy-link.module';
import {SharedModule} from '../../shared/shared.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [PostViewComponent],
  imports: [
    SharedModule,
    PostViewRoutingModule,
    ConfirmDialogModule,
    PostItemModule,
    SearchBoxModule,
    SelectOrderingModule,
    FilterNavigatorModule,
    PostRespondsListModule,
    EmptyPostModule,
    PostPreviewModule,
  AdsenseModule.forRoot({
      adClient: 'ca-pub-4091968257038599',
      adSlot: 1513385937,
    }),
    ProcessDialogModule,
    CopyLinkModule,
    DeviceDetectorModule.forRoot(),
    DateAgoModule
  ]
})
export class PostViewModule { }
