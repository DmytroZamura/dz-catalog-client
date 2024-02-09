import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchKeywordComponent} from './search-keyword.component';



const routes: Routes = [{ path: ':slug', component: SearchKeywordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchKeywordRoutingModule { }
