import { NgModule } from '@angular/core';

import { SupplyRequestsViewRoutingModule } from './supply-requests-view-routing.module';
import {SupplyRequestsViewComponent} from './supply-requests-view.component';
import {SharedModule} from '../../shared/shared.module';
import {SupplyRequestsListComponent} from './supply-requests-list/supply-requests-list.component';
import {SupplyRequestItemComponent} from './supply-request-item/supply-request-item.component';
import {SelectUserOrCompanyModule} from '../../common/select-user-or-company/select-user-or-company.module';
import {SearchBoxModule} from '../../common/search-box/search-box.module';
import {SelectOrderingModule} from '../../common/select-ordering/select-ordering.module';
import {FilterNavigatorModule} from '../../common/filter-navigator/filter-navigator.module';
import {DeferModule} from 'primeng/defer';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {ButtonModule} from 'primeng/button';
import {InplaceTextEditorModule} from '../../common/inplace-text-editor/inplace-text-editor.module';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {AttachedDocumentsModule} from '../../common/attached-documents/attached-documents.module';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InplaceModule} from 'primeng/inplace';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {SupplyRequestPositionsModule} from '../supply-request-positions/supply-request-positions.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProcessDialogModule} from '../../common/process-dialog/process-dialog.module';
import {HighlightborderModule} from '../../directives/highlightborder/highlightborder.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {EmptyPostModule} from '../../post/empty-post/empty-post.module';
import {DeviceDetectorModule} from 'ngx-device-detector';

import {DateAgoModule} from '../../pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [SupplyRequestsViewComponent, SupplyRequestsListComponent, SupplyRequestItemComponent],
  imports: [
    SharedModule,
    SupplyRequestsViewRoutingModule,
    SelectUserOrCompanyModule,
    SearchBoxModule,
    SelectOrderingModule,
    FilterNavigatorModule,
    DeferModule,
    UserPreviewShortModule,
    CompanyPreviewShortModule,
    ButtonModule,
    InplaceTextEditorModule,
    TextShowMoreModule,
    AttachedDocumentsModule,
    FormsModule,
    InputTextModule,
    InplaceModule,
    SelectCommonItemModule,
    SupplyRequestPositionsModule,
    InputTextareaModule,
    ProcessDialogModule,
    HighlightborderModule,
    ConfirmDialogModule,
    EmptyPostModule,
    DeviceDetectorModule.forRoot(),
    DateAgoModule

  ]
})
export class SupplyRequestsViewModule { }
