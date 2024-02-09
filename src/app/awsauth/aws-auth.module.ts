import {NgModule, PLATFORM_ID} from '@angular/core';

import {AWSAuthComponent} from './awsauth.component';

import {AWSAuthRoutingModule} from './aws-auth-routing.module';


import {SharedModule} from '../shared/shared.module';
import {AuthFixDirective} from './auth-fix.directive';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {ProcessDialogModule} from '../common/process-dialog/process-dialog.module';
import {HighlightborderModule} from '../directives/highlightborder/highlightborder.module';




@NgModule({
  declarations: [AWSAuthComponent, AuthFixDirective],
  imports: [

    SharedModule,
    AWSAuthRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    ProcessDialogModule,
    HighlightborderModule
  ]
})
export class AwsAuthModule {
}
