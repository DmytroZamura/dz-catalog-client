import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionComponent } from './promotion.component';

const routes: Routes = [{ path: ':code/:id', component: PromotionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
