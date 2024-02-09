import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostViewComponent} from './post-view.component';

const routes: Routes = [{ path: ':id', component: PostViewComponent },
{ path: ':id/:language', component: PostViewComponent },
{ path: ':subject/:sslug/:slug/:language', component: PostViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostViewRoutingModule { }
