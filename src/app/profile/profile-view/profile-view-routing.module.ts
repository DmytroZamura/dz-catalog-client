import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileViewComponent} from './profile-view.component';



const routes: Routes = [{ path: ':slug', component: ProfileViewComponent },
{ path: ':slug/:language', component: ProfileViewComponent }];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileViewRoutingModule { }
