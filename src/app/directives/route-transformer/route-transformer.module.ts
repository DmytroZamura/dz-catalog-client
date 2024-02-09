import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouteTransformerDirective} from './route-transformer.directive';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [RouteTransformerDirective],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [RouteTransformerDirective]
})
export class RouteTransformerModule { }
