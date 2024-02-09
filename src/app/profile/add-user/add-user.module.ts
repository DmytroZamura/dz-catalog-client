import { NgModule } from '@angular/core';
import {AddUserComponent} from './add-user.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {SelectProfileModule} from '../select-profile/select-profile.module';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [AddUserComponent],
  imports: [
    SharedModule, DialogModule, SelectProfileModule, ButtonModule
  ],
  exports: [AddUserComponent]
})
export class AddUserModule { }
