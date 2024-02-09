import { NgModule } from '@angular/core';

import { EditArticleRoutingModule } from './edit-article-routing.module';
import {EditArticleComponent} from './edit-article.component';
import {SharedModule} from '../../../shared/shared.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FormsModule} from '@angular/forms';
import {CompanyPreviewShortModule} from '../../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../../common/user-preview-short/user-preview-short.module';
import {ButtonModule} from 'primeng/button';
import {SelectCategoryModule} from '../../../category/select-category/select-category.module';
import {InputTextModule} from 'primeng/inputtext';
import {SelectLocationModule} from '../../../general/select-location/select-location.module';
import {ChipsModule} from 'primeng/chips';
import {RouterModule} from '@angular/router';
import {FileModule} from '../../../common/file/file.module';
import { TabViewModule} from 'primeng/tabview';
import {TextEditorModule} from '../../../common/text-editor/text-editor.module';
import {ProcessDialogModule} from '../../../common/process-dialog/process-dialog.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ListboxModule} from 'primeng/listbox';
import {DeviceDetectorModule} from 'ngx-device-detector';



@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    SharedModule,
    EditArticleRoutingModule,
    ProgressSpinnerModule,
    FormsModule,
    CompanyPreviewShortModule,
    UserPreviewShortModule,
    ButtonModule,
    SelectCategoryModule,
    InputTextModule,
    SelectLocationModule,
    ChipsModule,
    RouterModule,
    FileModule,
    TabViewModule,
    TextEditorModule,
    ProcessDialogModule,
    ConfirmDialogModule,
    ListboxModule,
    DeviceDetectorModule.forRoot()
  ]
})
export class EditArticleModule { }
