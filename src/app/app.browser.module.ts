import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {NgModule} from '@angular/core';



@NgModule({
  bootstrap: [AppComponent],

  imports: [


    AppModule,

  ]
})

export class AppBrowserModule {
}


