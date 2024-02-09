import { NgModule } from '@angular/core';

import {TagPreviewComponent} from './tag-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FollowTagButtonModule} from '../follow-tag-button/follow-tag-button.module';



@NgModule({
  declarations: [TagPreviewComponent],
  imports: [
    SharedModule, RouterModule, FollowTagButtonModule
  ],
  exports: [TagPreviewComponent]
})
export class TagPreviewModule { }
