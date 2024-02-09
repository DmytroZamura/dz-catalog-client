import { NgModule } from '@angular/core';
import {CopyLinkComponent} from './copy-link.component';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [CopyLinkComponent],
  imports: [
    SharedModule, FormsModule, InputTextModule, ButtonModule, DialogModule
  ],
  exports: [CopyLinkComponent]
})
export class CopyLinkModule { }
