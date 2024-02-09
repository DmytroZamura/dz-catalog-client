import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyViewComponent} from './company-view.component';



const routes: Routes = [{ path: ':slug/:language', component: CompanyViewComponent },
{ path: ':slug', component: CompanyViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyViewRoutingModule { }
