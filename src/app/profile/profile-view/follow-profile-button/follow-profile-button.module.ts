import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FollowProfileButtonComponent} from './follow-profile-button.component';
import {ButtonModule} from 'primeng/button';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [FollowProfileButtonComponent],
  imports: [
    CommonModule, ButtonModule, TranslateModule
  ],
  exports: [FollowProfileButtonComponent]
})
export class FollowProfileButtonModule { }
