import {NgModule, Type} from '@angular/core';
import { TopButtonsComponent } from './top-buttons.component';
import {SharedModule} from '../shared/shared.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SearchBoxModule} from '../common/search-box/search-box.module';
import {RouterModule} from '@angular/router';
import {JoyrideModule} from 'ngx-joyride';





@NgModule({
  declarations: [TopButtonsComponent],
  imports: [
    SharedModule, SplitButtonModule, SearchBoxModule, RouterModule, JoyrideModule.forChild()
  ],
  exports: [TopButtonsComponent]
})
export class TopButtonsModule {
  customElementComponent: Type<any> = TopButtonsComponent;
}
