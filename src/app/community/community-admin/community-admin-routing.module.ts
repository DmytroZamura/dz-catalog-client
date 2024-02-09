import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityAdminComponent } from './community-admin.component';

const routes: Routes = [{ path: ':id', component: CommunityAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityAdminRoutingModule { }
