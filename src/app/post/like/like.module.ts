import { NgModule } from '@angular/core';

import {LikeComponent} from './like.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {GeneralService} from '../../general/general.service';





@NgModule({
  declarations: [LikeComponent],
  imports: [
    SharedModule, ButtonModule
  ],
  providers: [GeneralService],
  exports: [LikeComponent]
})
export class LikeModule { }
