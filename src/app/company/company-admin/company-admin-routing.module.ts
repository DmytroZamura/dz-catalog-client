import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyAdminComponent} from './company-admin.component';



const routes: Routes = [{ path: ':slug', component: CompanyAdminComponent },
{ path: ':slug/:tab', component: CompanyAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyAdminRoutingModule { }
