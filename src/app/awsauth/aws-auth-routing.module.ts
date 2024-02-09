import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AWSAuthComponent} from './awsauth.component';




const routes: Routes = [
  {
    path: '',
    component: AWSAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AWSAuthRoutingModule { }
