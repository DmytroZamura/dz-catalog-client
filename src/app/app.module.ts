import {NgtUniversalModule} from '@ng-toolkit/universal';

import {Injectable, NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';


import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth.interceptor';
import {CallbackComponent} from './callback/callback.component';
import {AuthGuard} from './auth.guard';
import {APP_INITIALIZER} from '@angular/core';
import {AppConfig} from './config/config.service';
import {I18Module} from './I18n.module';

import {BROWSER_FAVICONS_CONFIG} from './favicons.service';
import {BrowserFavicons} from './favicons.service';
import {FaviconsService} from './favicons.service';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FooterModule} from './footer/footer.module';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';
import {AppService} from './app.service';
import {MessagingComponent} from './messaging/messaging.component';
import {AppTopbarComponent} from './app.topbar.component';
import {JoyrideModule} from 'ngx-joyride';



export function initializeApp() {
  return () => AppConfig.load();
}

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: {enable: false},
    rotate: {enable: false}
  };
}

const lazyConfig = [
  {
    selector: 'app-notification-lazy',
    loadChildren: () =>
      import('./notification/notification.module').then(m => m.NotificationModule)
  },
  {
    selector: 'app-notification-feed-lazy',
    loadChildren: () =>
      import('./notification/notification-feed/notification-feed.module').then(m => m.NotificationFeedModule)
  },

  {
    selector: 'app-chat-list-lazy',
    loadChildren: () =>
      import('./messaging/chat-list/chat-list.module').then(m => m.ChatListModule)
  },
  {
    selector: 'app-chat-lazy',
    loadChildren: () =>
      import('./messaging/chat/chat.module').then(m => m.ChatModule)
  },
  {
    selector: 'app-sidebar-lazy',
    loadChildren: () =>
      import('./sidebar/sidebar.module').then(m => m.SidebarModule)
  },
  {
    selector: 'app-wizards-lazy',
    loadChildren: () =>
      import('./general/wizards/wizards.module').then(m => m.WizardsModule)
  },
  {
    selector: 'app-show-auth-dialog-lazy',
    loadChildren: () =>
      import('./common/show-auth-dialog/show-auth-dialog.module').then(m => m.ShowAuthDialogModule)
  },
  {
    selector: 'app-edit-post-lazy',
    loadChildren: () =>
      import('./post/edit-post/edit-post.module').then(m => m.EditPostModule)
  },
  {
    selector: 'app-welcome-dialog-lazy',
    loadChildren: () =>
      import('./common/welcome-dialog/welcome-dialog.module').then(m => m.WelcomeDialogModule)
  },
  {
    selector: 'app-create-comment-lazy',
    loadChildren: () =>
      import('./post/comment/create-comment/create-comment.module').then(m => m.CreateCommentModule)
  },

  {
    selector: 'app-top-buttons-lazy',
    loadChildren: () =>
      import('./top-buttons/top-buttons.module').then(m => m.TopButtonsModule)
  },

  {
    selector: 'app-app-auth-lazy',
    loadChildren: () =>
      import('./awsauth/app-auth/app-auth.module').then(m => m.AppAuthModule)
  },


];


@NgModule({
  bootstrap: [AppComponent],

  imports: [

    SharedModule,

    NgtUniversalModule,


    HttpClientModule,

    BrowserModule.withServerTransition({appId: 'uafine'}),
    TransferHttpCacheModule,


    NgxLazyElModule.forRoot(lazyConfig),
    JoyrideModule.forRoot(),


    AppRoutingModule,

    BrowserAnimationsModule,


    I18Module,



    // DeviceDetectorModule.forRoot(),


    // SearchBoxModule,


    FooterModule,
    // SplitButtonModule,
    // ToastModule


  ],
  declarations: [
    AppComponent,
    AppTopbarComponent,
    CallbackComponent,
    MessagingComponent


  ],
  providers: [
    AppService,

    AuthGuard,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig
    },

    // The Favicons is an abstract class that represents the dependency-injection
    // token and the API contract. THe BrowserFavicon is the browser-oriented
    // implementation of the service.
    {
      provide: FaviconsService,
      useClass: BrowserFavicons
    },
    // The BROWSER_FAVICONS_CONFIG sets up the favicon definitions for the browser-
    // based implementation. This way, the rest of the application only needs to know
    // the identifiers (ie, "happy", "default") - it doesn't need to know the paths
    // or the types. This allows the favicons to be modified independently without
    // coupling too tightly to the rest of the code.
    {
      provide: BROWSER_FAVICONS_CONFIG,
      useValue: {
        icons: {
          'default': {
            type: 'image/svg',
            href: 'static/assets/img/uafine-logo-circle-colored.svg',
            isDefault: true
          },
          'notification': {
            type: 'image/jpeg',
            href: 'static/assets/img/ua-fine-notification.svg',
          }
        },

        // I determine whether or not a random token is auto-appended to the HREF
        // values whenever an icon is injected into the document.
        cacheBusting: true
      }
    }

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}


