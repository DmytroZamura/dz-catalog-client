import { NgModule } from '@angular/core';

import { PostRespondsRoutingModule } from './post-responds-routing.module';
import {PostRespondsViewComponent} from './post-responds-view/post-responds-view.component';
import {SharedModule} from '../../shared/shared.module';
import {SelectUserOrCompanyModule} from '../../common/select-user-or-company/select-user-or-company.module';
import {SelectOrderingModule} from '../../common/select-ordering/select-ordering.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {PostRespondsListModule} from './post-responds-view/post-responds-list/post-responds-list.module';
import {SearchBoxModule} from '../../common/search-box/search-box.module';



@NgModule({
  declarations: [PostRespondsViewComponent],
  imports: [
    SharedModule,
    PostRespondsRoutingModule,
    SelectUserOrCompanyModule,
    SelectOrderingModule,
    FilterNavigatorModule,
    PostRespondsListModule,
    SearchBoxModule
  ]
})
export class PostRespondsModule { }
