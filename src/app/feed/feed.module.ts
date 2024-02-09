import { NgModule } from '@angular/core';

import { FeedRoutingModule } from './feed-routing.module';
import {FeedComponent} from './feed.component';
import {SharedModule} from '../shared/shared.module';
import {CreatePostModule} from '../post/create-post/create-post.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FilterNavigatorModule} from '../common/filter-navigator/filter-navigator.module';
import {FilteredPostsListModule} from '../post/filtered-posts-list/filtered-posts-list.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {AdsenseModule} from 'ng2-adsense';
import {InputTextModule} from 'primeng/inputtext';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {JoyrideModule} from 'ngx-joyride';




@NgModule({
  declarations: [FeedComponent],
  imports: [
    SharedModule,
    FeedRoutingModule,
    CreatePostModule, InputTextareaModule,
    FilterNavigatorModule,
    FilteredPostsListModule,
    DashboardModule,
    AdsenseModule,
    InputTextModule,
    DeviceDetectorModule.forRoot(),
    JoyrideModule.forChild()

  ]
})
export class FeedModule { }
