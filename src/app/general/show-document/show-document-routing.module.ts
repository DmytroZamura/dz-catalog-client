import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowDocumentComponent} from './show-document.component';



const routes: Routes = [{ path: ':code', component: ShowDocumentComponent },
{ path: ':code/:language', component: ShowDocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDocumentRoutingModule { }
