import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleViewComponent} from './article-view.component';

const routes: Routes = [{ path: ':subject/:sslug/:slug', component: ArticleViewComponent },
{ path: ':subject/:sslug/:slug/:language', component: ArticleViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleViewRoutingModule { }
