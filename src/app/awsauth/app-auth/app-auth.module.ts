import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAuthComponent} from './app-auth.component';
import awsconfig from '../../../aws-exports';
import Auth from '@aws-amplify/auth';

Auth.configure(awsconfig);

@NgModule({
  declarations: [AppAuthComponent],
  imports: [
    CommonModule
  ],
  exports: [AppAuthComponent]
})
export class AppAuthModule {
  customElementComponent: Type<any> = AppAuthComponent;
}
