import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplyRequestsViewComponent} from './supply-requests-view.component';
import {AuthGuard} from '../../auth.guard';



const routes: Routes = [{ path: ':userType', component: SupplyRequestsViewComponent },
{ path: ':userType/:company', component: SupplyRequestsViewComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRequestsViewRoutingModule { }
