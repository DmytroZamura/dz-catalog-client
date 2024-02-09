import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAdminComponent} from './product-admin.component';



const routes: Routes = [{ path: ':id', component: ProductAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAdminRoutingModule { }
