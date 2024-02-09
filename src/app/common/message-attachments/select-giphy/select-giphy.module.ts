import {NgModule} from '@angular/core';
import {SelectGiphyComponent} from './select-giphy.component';
import {SharedModule} from '../../../shared/shared.module';

import {SearchBoxModule} from '../../search-box/search-box.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';








@NgModule({
  declarations: [SelectGiphyComponent],
  imports: [
  SharedModule, SearchBoxModule, ProgressSpinnerModule
  ],
  exports: [SelectGiphyComponent]
})
export class SelectGiphyModule {
  // customElementComponent: Type <any> = SelectGiphyComponent;
}
