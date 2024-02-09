import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunitiesHomeComponent} from './communities-home.component';



const routes: Routes = [{ path: '', component: CommunitiesHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunitiesHomeRoutingModule { }
