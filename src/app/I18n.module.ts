import { NgModule,  PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { translateFactory } from './universal.loader';
import { TransferState } from '@angular/platform-browser';



@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [TransferState, HttpClient, PLATFORM_ID],

      },

    }),
  ],
  exports: [TranslateModule]
})
export class I18Module {
  constructor(translate: TranslateService) {
    // translate.setDefaultLang('en');
  }
}
