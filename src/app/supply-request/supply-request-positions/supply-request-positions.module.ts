import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupplyRequestPositionsComponent} from './supply-request-positions.component';
import {SupplyRequestPositionModule} from './supply-request-position/supply-request-position.module';



@NgModule({
  declarations: [SupplyRequestPositionsComponent],
  imports: [
    CommonModule, SupplyRequestPositionModule
  ],
  exports: [SupplyRequestPositionsComponent]
})
export class SupplyRequestPositionsModule { }
