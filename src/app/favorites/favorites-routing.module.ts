import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {FavoritesComponent} from './favorites.component';

const routes: Routes = [{path: '', component: FavoritesComponent},
  {path: ':tab', component: FavoritesComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule {
}
