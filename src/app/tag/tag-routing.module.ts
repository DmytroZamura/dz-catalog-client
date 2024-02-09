import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagComponent} from './tag.component';




const routes: Routes = [{ path: ':slug', component: TagComponent },
{ path: ':slug/:language', component: TagComponent }];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
