import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {FollowCompanyButtonComponent} from './follow-company-button.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [FollowCompanyButtonComponent],
  imports: [
    CommonModule, ButtonModule, TranslateModule
  ],
  exports: [FollowCompanyButtonComponent]
})
export class FollowCompanyButtonModule {
}
