import {NgModule, Type} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {EditPostComponent} from './edit-post.component';
import {OfferingTypeComponent} from './offering-type/offering-type.component';
import {GeneralService} from '../../general/general.service';
import {FormsModule} from '@angular/forms';
import {SelectCategoryModule} from '../../category/select-category/select-category.module';
import {CompanyPreviewShortModule} from '../../common/company-preview-short/company-preview-short.module';
import {UserPreviewShortModule} from '../../common/user-preview-short/user-preview-short.module';
import {RatingModule} from 'primeng/rating';
import {CalendarModule} from 'primeng/calendar';
import {SelectCommonItemModule} from '../../general/select-common-item/select-common-item.module';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {TextEditorModule} from '../../common/text-editor/text-editor.module';
import {AttributesModule} from '../../attribute/attributes.module';
import {UrlPreviewModule} from '../../common/url-preview/url-preview.module';
import {FileModule} from '../../common/file/file.module';
import {FieldsetModule} from 'primeng/fieldset';
import {ImagesListModule} from '../../common/images-list/images-list.module';
import {AttachedDocumentsModule} from '../../common/attached-documents/attached-documents.module';
import {ButtonModule} from 'primeng/button';
import {PostOptionsComponent} from './post-options/post-options.component';
import {SelectButtonModule} from 'primeng/selectbutton';





@NgModule({
  declarations: [EditPostComponent, OfferingTypeComponent, PostOptionsComponent],
  imports: [
    SharedModule, FormsModule, SelectCategoryModule, CompanyPreviewShortModule, UserPreviewShortModule, RatingModule,
    CalendarModule, SelectCommonItemModule, InputTextModule, MessageModule, CheckboxModule, TextEditorModule, AttributesModule,
    UrlPreviewModule, FileModule, FieldsetModule, ImagesListModule, AttachedDocumentsModule, ButtonModule, SelectButtonModule
  ],
  exports: [EditPostComponent]
})
export class EditPostModule {
  customElementComponent: Type<any> = EditPostComponent;
}
