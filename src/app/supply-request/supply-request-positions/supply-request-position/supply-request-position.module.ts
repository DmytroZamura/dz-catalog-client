import { NgModule } from '@angular/core';
import {SupplyRequestPositionComponent} from './supply-request-position.component';
import {SharedModule} from '../../../shared/shared.module';
import {InplaceModule} from 'primeng/inplace';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [SupplyRequestPositionComponent],
  imports: [
    SharedModule, InplaceModule, InputTextModule, FormsModule, ButtonModule
  ],
  exports: [SupplyRequestPositionComponent]
})
export class SupplyRequestPositionModule { }
