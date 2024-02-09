import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './custom-url-serializer';




@NgModule({
  bootstrap: [AppComponent],

  imports: [


    AppModule,

    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule, // comment
    // ModuleMapLoaderModule,

  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ]
})
export class AppServerModule {
}

