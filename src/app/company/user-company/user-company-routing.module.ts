import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserCompanyComponent} from './user-company.component';



const routes: Routes = [{ path: '', component: UserCompanyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCompanyRoutingModule { }
