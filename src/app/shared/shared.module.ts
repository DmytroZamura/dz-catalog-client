import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TruncateModule} from 'ng2-truncate';
import {ThousandSuffixesPipe} from '../pipes/thousand-suffixes.pipe';
import {TagsPipe} from '../pipes/tags.pipe';


@NgModule({
  declarations: [ThousandSuffixesPipe, TagsPipe],
  imports: [

  ],
  exports: [
    CommonModule,
    TranslateModule,
    TruncateModule,
    ThousandSuffixesPipe,
    TagsPipe
  ]
})
export class SharedModule {
}
