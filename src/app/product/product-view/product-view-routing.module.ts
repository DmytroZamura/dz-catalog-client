import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductViewComponent} from './product-view.component';



const routes: Routes = [{ path: ':id', component: ProductViewComponent },
{ path: ':id/:language', component: ProductViewComponent },
{ path: ':subject/:sslug/:slug/:language', component: ProductViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductViewRoutingModule { }
