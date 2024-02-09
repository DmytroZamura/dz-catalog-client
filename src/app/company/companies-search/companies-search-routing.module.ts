import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompaniesSearchComponent} from './companies-search.component';



const routes: Routes = [{ path: '', component: CompaniesSearchComponent },
{ path: ':language', component: CompaniesSearchComponent }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesSearchRoutingModule { }
