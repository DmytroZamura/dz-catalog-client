import { NgModule } from '@angular/core';

import {FollowTagButtonComponent} from './follow-tag-button.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [FollowTagButtonComponent],
  imports: [
    SharedModule, ButtonModule
  ],
  exports: [FollowTagButtonComponent]
})
export class FollowTagButtonModule { }
