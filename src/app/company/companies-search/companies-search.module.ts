import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesSearchRoutingModule } from './companies-search-routing.module';
import {CompaniesSearchComponent} from './companies-search.component';
import {ItemsListAgileModule} from '../../general/items-list-agile/items-list-agile.module';
import {ManageItemsListModule} from '../../general/manage-items-list/manage-items-list.module';
import {CompanyFeedPreviewModule} from '../../common/company-feed-preview/company-feed-preview.module';



@NgModule({
  declarations: [CompaniesSearchComponent],
  imports: [
    CommonModule,
    CompaniesSearchRoutingModule,
    ItemsListAgileModule,
    ManageItemsListModule,
    CompanyFeedPreviewModule
  ]
})
export class CompaniesSearchModule { }
