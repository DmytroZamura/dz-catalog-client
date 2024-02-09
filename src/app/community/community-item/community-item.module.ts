import { NgModule } from '@angular/core';

import {CommunityItemComponent} from './community-item.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CommunityButtonsModule} from '../community-buttons/community-buttons.module';
import {LazyImgModule} from '../../directives/lazy-img/lazy-img.module';



@NgModule({
  declarations: [CommunityItemComponent],
  imports: [
    SharedModule, RouterModule, CommunityButtonsModule, LazyImgModule
  ],
  exports: [CommunityItemComponent]
})
export class CommunityItemModule { }
