import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditArticleComponent} from './edit-article.component';



const routes: Routes = [{ path: ':id', component: EditArticleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditArticleRoutingModule { }
