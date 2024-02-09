import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostRespondsViewComponent} from './post-responds-view/post-responds-view.component';


const routes: Routes = [{path: ':userType/:postType', component: PostRespondsViewComponent},
  {path: ':userType/:postType/:company', component: PostRespondsViewComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRespondsRoutingModule {
}
