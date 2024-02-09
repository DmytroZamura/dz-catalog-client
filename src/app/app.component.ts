import {isPlatformBrowser} from '@angular/common';
import {LOCAL_STORAGE, WINDOW} from '@ng-toolkit/universal';
import {
  Component,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  OnInit,
  NgZone,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {GeneralService} from './general/general.service';
import {LanguageService} from './general/language.service';
import {Subscription} from 'rxjs';
import {SignalService} from './signal.service';
import {MessageService} from 'primeng/api';

import {MessagingService} from './messaging/messaging.service';

import {FaviconsService} from './favicons.service';
import {AggregatedFeedItem} from './post/post';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile, UserSettings} from './profile/profile';
import {UtilsService} from './utils.service';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './config/config.service';


// import Auth from '@aws-amplify/auth';

import {DOCUMENT} from '@angular/common';
import {environment} from '../environments/environment';
import {AppService} from './app.service';
import {CommonItem} from './general/common-item';


enum MenuOrientation {
  STATIC,
  OVERLAY
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GeneralService, LanguageService, MessageService]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('notificationsFeed') notificationFeedComponent: any;
  @ViewChild('wizards') wizardsComponent: any;
  @ViewChild('authComp') authComponent: any;


  isBrowser = false;


  documentClickListener: Function;

  rippleInitListener: any;

  rippleMouseDownListener: any;
  audiosWeWantToUnlock = false;


  private subscription: Subscription;

  private createSubscription: Subscription;
  private onLangChange: Subscription = undefined;
  location = {};
  refreshPostTypes = false;
  lang: string;
  endpoint = AppConfig.settings.endPointUrl;


  private timeStampSubscription: Subscription;


  setPosition(position) {
    const location = position.coords;
    this.localStorage.setItem('latitude', location.latitude);
    this.localStorage.setItem('longitude', location.longitude);
  }


  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, @Inject(WINDOW) private window: Window,
              @Inject(LOCAL_STORAGE) private localStorage: any, private ngZone: NgZone, private activateRoute: ActivatedRoute,
              public renderer: Renderer2, public messageServide: MessageService, private messagingService: MessagingService,
              private router: Router,
              public zone: NgZone, public languageService: LanguageService, private signalService: SignalService,
              private generalService: GeneralService,
              private favicons: FaviconsService, public translate: TranslateService, public el: ElementRef,
              public appService: AppService,
              public http: HttpClient
  ) {


    this.isBrowser = isPlatformBrowser(this.platformId);
    const currentUserId = +localStorage.getItem('user_id');
    if (currentUserId) {
      this.appService.startAuth = true;
      appService.currentUserId = currentUserId;
    } else {

      this.appService.initRoutings();
    }


  }


  ngOnInit() {

    this.appService.newTimestamp();
    if (this.isBrowser) {

      setTimeout(() => {
        this.appService.loadingIcons = true;

      }, 500);

      setTimeout(() => {
        this.appService.loadingLazyElements = true;
        this.askCoociesPolicy();
      }, 2500);


      this.zone.runOutsideAngular(() => this.ngZone.run(() => {
        this.bindRipple();
      }));


      const subscription = this.signalService.totalEventsQty.subscribe(res => {
        this.appService.totalEventsQty = res;

      });
      this.subscription = new Subscription();
      this.subscription.add(subscription);


      this.timeStampSubscription = this.signalService.newTimeStamp.subscribe(post => {


        this.newTimestamp();

      });

      this.createSubscription = this.appService.createObject.subscribe(type => {

        if (type === 'company') {
          this.onCreateCompany();
        }

        if (type === 'product') {
          this.onCreateProduct();
        }

        if (type === 'post' || type === 'offering' || type === 'job' || type === 'request') {
          this.onCreatePost(type);
        }

        if (type === 'article') {
          this.onCreateArticle();
        }


      });


      this.onLangChange = this.translate.onLangChange.subscribe(() => {
        this.updateLanguage();
        this.initOnboardingButtonsText();

      });

      if (!isPlatformBrowser(this.platformId)) {
        const bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
          bases[0].setAttribute('href', environment.baseHref);
        }
      }
    } else {
      this.appService.routeReady = true;

    }


    this.appService.sidebarActive = false;


    this.appService.activeTabIndex = 0;
  }


  setLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  initOnboardingButtonsText() {
    this.translate.get('ONBOARDING.next').subscribe(res => {
      this.appService.nextText = res;
    });
    this.translate.get('ONBOARDING.prev').subscribe(res => {
      this.appService.prevText = res;
    });
    this.translate.get('ONBOARDING.done').subscribe(res => {
      this.appService.doneText = res;
    });
  }


  startFirstTour(event) {
    const innerWidth = window.innerWidth;
    if (innerWidth > 800) {
      this.appService.startFirstTour(event);
    } else {
      this.appService.startMobileFirstTour();
    }
  }

  askCoociesPolicy() {
    if (this.isBrowser) {
      let message = '';
      let dismiss: '';
      let link: '';
      this.translate.get('ALERTS.Cookies Message').subscribe(res => {
        message = res;
        this.translate.get('ALERTS.Accept Cookies').subscribe(res1 => {
          dismiss = res1;
          this.translate.get('ALERTS.Cookies Policy').subscribe(res2 => {
            link = res2;
            const cc = window as any;
            if (cc.cookieconsent) {
              cc.cookieconsent.initialise({
                palette: {
                  popup: {
                    background: '#fbfbfb'
                  },
                  button: {
                    background: '#00796b',
                    text: '#ffffff'
                  }
                },
                theme: 'classic',
                content: {
                  message: message,
                  dismiss: dismiss,
                  link: link,
                  href: environment.config.redirectUri + '/document/cookies-policy/' + this.translate.currentLang
                }
              });
            }
          });
        });
      });


    }
  }


  showSelectedChat(selectedChat) {

    if (!this.appService.showChat) {
      this.appService.selectedChat = selectedChat;
      this.appService.showChat = true;
    } else {
      if (this.wizardsComponent) {

        this.wizardsComponent.nativeElement.currentChat = selectedChat;
      }
    }
  }


  newTimestamp() {

    this.appService.newTimestamp();


  }

  setAuthState(authState, username) {


    if (this.appService.user !== username) {


      if (username) {

        this.appService.user = username;


        this.appService.signedIn = authState as string === 'signedin' || authState as string === 'cognitoHostedUI';
        if (!this.appService.signedIn) {
          this.appService.initRoutings();
          this.deleteSessionData();


        } else {
          this.appService.initRoutings();
          this.setSession(this.appService.user);


        }


      }
    }
  }


  public login(): void {
    // this0.authorize();
    this.router.navigate(['/auth/']);
  }


  private check_update(profile: UserSettings, sub: string, locale: string): Promise<Profile> {
    const url = `${this.endpoint}${'profile-check/'}${sub}${'/'}${locale}${'/'}`;
    return this.http
      .put(url, JSON.stringify(profile))
      .toPromise()
      .then(response => response as Profile)
      .catch(UtilsService.handleError);
  }


  public setSession(username: string): void {

    const userId = this.localStorage.getItem('user_id');

    if (!userId) {
      this.localStorage.setItem('user_id', '0');
    }

    if (this.isBrowser) {


      const authProfile = new UserSettings();

      const locale = this.localStorage.getItem('language_code');


      this.check_update(authProfile, username, locale)
        .then(res => {

          if (res.id) {
            this.appService.userProfile = res;
            this.appService.currentUserId = res.user_id;


            this.initSessionProfile();

          }


        })
        .catch(error => {
          UtilsService.handleError(error);
        });

    }
  }


  initSessionProfile() {
    if (this.isBrowser) {

      const url = `${'check-payments-accounts'}`;
      this.generalService.createItem(url, null)
        .then(res => {
        })
        .catch(error => {
          console.log(error);
        });

      const oldUserId = this.localStorage.getItem('user_id');

      this.localStorage.setItem('user_id', this.appService.userProfile.user_id.toString());
      this.localStorage.setItem('language_code', this.appService.userProfile.language_details.code);
      this.localStorage.setItem('currency', this.appService.userProfile.default_currency.toString());


      this.signalService.refreshTotalEventsQty();


      if (oldUserId !== this.appService.userProfile.user_id.toString()) {


        this.languageService.setLocale(this.appService.userProfile.language_details.code);

        if (this.appService.userProfile.settings_checked) {
          this.ngZone.run(() => this.router.navigate(['/feed/' + this.lang])).then();
          // this.router.navigate(['/feed']);
        } else {
          this.ngZone.run(() => this.router.navigate(['/settings'])).then();
          // this.router.navigate(['/settings']);
        }

      }
    }


  }

  public logout(): void {
    if (this.authComponent) {
      this.authComponent.nativeElement.runLogout = true;
    }
    this.appService.currentUserId = 0;
    this.deleteSessionData();

    this.signalService.onLogout();

    // Remove tokens and expiry time from localStorage


    // Auth.signOut({global: true})
    //   .then(data => {
    //
    //
    //     this.ngZone.run(() => this.router.navigate(['/auth'])).then();
    //     // this.router.navigate(['/auth']);
    //   })
    //   .catch(err => console.log(err));


  }

  public deleteSessionData(): void {
    // Remove tokens and expiry time from this.localStorage.removeItem('access_token');


    this.appService.signedIn = false;


    this.localStorage.removeItem('user_id');
    this.localStorage.removeItem('username');
    this.localStorage.removeItem('currency');


    // Go back to the home route

    this.appService.userProfile = new Profile();


  }


  updateLanguage(): void {

    const lang = document.createAttribute('lang');
    lang.value = this.translate.currentLang;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }

  onShowChat(chat: number) {

    if (!this.appService.showChat) {
      this.appService.currentChatId = chat;
      this.appService.showChat = true;
    } else {
      if (this.wizardsComponent) {

        this.wizardsComponent.nativeElement.chatID = chat;
      }
    }


  }

  onCreateArticle() {
    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newArticle = true;

    } else {

      this.appService.showAuthDialog = true;
    }

  }

  onCreateProduct(company = null) {

    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newProduct = company;

    } else {
      this.appService.showAuthDialog = true;
    }


  }

  onCreateCompany() {

    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newCompany = true;

    } else {
      this.appService.showAuthDialog = true;
    }


  }

  showNotificationsBar() {

    if (this.notificationFeedComponent) {
      this.notificationFeedComponent.nativeElement.showBar = true;
    }
  }

  onSeenNotifications(res) {
    if (this.appService.userProfile.eventsqty && res) {
      this.appService.userProfile.eventsqty.notifications = 0;
      if (this.appService.totalEventsQty.notifications) {
        this.appService.totalEventsQty.notifications = 0;
      }
      if (this.isBrowser) {
        this.favicons.reset();
      }
    }
  }

  addNotificationToFeed(item: AggregatedFeedItem) {
    this.notificationFeedComponent.nativeElement.notification = item;
  }

  onLayoutClick() {
    if (!this.audiosWeWantToUnlock) {

      const audio = new Audio();
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          audio.pause();
          audio.currentTime = 0;
        })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            audio.pause();
            audio.currentTime = 0;
          });

      }
      this.audiosWeWantToUnlock = true;
    }
  }


  bindRipple() {
    this.rippleInitListener = this.init.bind(this);
    document.addEventListener('DOMContentLoaded', this.rippleInitListener);
  }

  init() {
    this.rippleMouseDownListener = this.rippleMouseDown.bind(this);
    document.addEventListener('mousedown', this.rippleMouseDownListener, false);
  }

  rippleMouseDown(e) {

    for (let target = e.target; target && target !== this; target = target['parentNode']) {
      if (!this.isVisible(target)) {
        continue;
      }

      // Element.matches() -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
      if (this.selectorMatches(target, '.ripplelink, .ui-button')) {
        const element = target;
        this.rippleEffect(element, e);
        break;
      }
    }
  }

  selectorMatches(el, selector) {
    const p = Element.prototype;
    const f = p['matches'] || p['webkitMatchesSelector'] || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  }

  isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight);
  }

  rippleEffect(element, e) {
    if (element.querySelector('.ink') === null) {
      const inkEl = document.createElement('span');
      this.addClass(inkEl, 'ink');

      if (this.hasClass(element, 'ripplelink') && element.querySelector('span')) {
        element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
      } else {
        element.appendChild(inkEl);
      }
    }

    const ink = element.querySelector('.ink');
    this.removeClass(ink, 'ripple-animate');

    if (!ink.offsetHeight && !ink.offsetWidth) {
      const d = Math.max(element.offsetWidth, element.offsetHeight);
      ink.style.height = d + 'px';
      ink.style.width = d + 'px';
    }

    const x = e.pageX - this.getOffset(element).left - (ink.offsetWidth / 2);
    const y = e.pageY - this.getOffset(element).top - (ink.offsetHeight / 2);

    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    ink.style.pointerEvents = 'none';
    this.addClass(ink, 'ripple-animate');
  }

  hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: 0, left: 0,

    };
  }

  unbindRipple() {
    if (this.rippleInitListener) {
      document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
    }
    if (this.rippleMouseDownListener) {
      document.removeEventListener('mousedown', this.rippleMouseDownListener);
    }
  }

  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.appService.topbarItemClick) {
        this.appService.activeTopbarItem = null;
        this.appService.topbarMenuActive = false;
      }

      if (!this.appService.sidebarClick && (this.overlay)) {

        this.appService.sidebarActive = false;
      }

      this.appService.topbarItemClick = false;
      this.appService.sidebarClick = false;
    });


    if (this.isBrowser) {
      const loader = this.renderer.selectRootElement('#loader');
      this.renderer.setStyle(loader, 'display', 'none');
    }


  }


  get overlay(): boolean {
    return this.appService.layoutMode === MenuOrientation.OVERLAY;
  }

  changeToStaticMenu() {
    this.appService.layoutMode = MenuOrientation.STATIC;
  }

  changeToOverlayMenu() {
    this.appService.layoutMode = MenuOrientation.OVERLAY;
  }

  isDesktop() {
    if (this.isBrowser) {
      return this.window.innerWidth > 1024;
    }
  }


  getPostTypes(language = null, postCode = null) {


    let filter = '';
    if (language) {
      filter = '?language_code=' + language;
    }

    this.generalService.getCommonItems('post-types', filter)
      .then(types => {


        this.appService.postTypes = types;
        if (this.refreshPostTypes) {
          this.wizardsComponent.nativeElement.newPost = postCode;


        }


      })
      .catch(error => {
        if (this.isBrowser) {
          console.log(error);
          const userId = this.localStorage.getItem('user_id');
          if (userId) {
            this.deleteSessionData();
            window.location.reload();
          }
        }

      });
  }


  showPostDialog(postType: CommonItem, company: number) {


    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newPostDialog = {postType: postType, company: company};

    } else {
      this.appService.showAuthDialog = true;
    }


  }

  onCreatePost(code: string) {
    if (this.refreshPostTypes) {
      this.getPostTypes(null, code);
    }

    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newPost = code;

    } else {
      this.appService.showAuthDialog = true;
    }


  }

  refreshUserRoles() {
    if (this.appService.isAuthenticated()) {
      this.wizardsComponent.nativeElement.newRoles = true;
    }
  }


  ngOnDestroy() {


    if (this.isBrowser) {
      if (this.documentClickListener) {
        this.documentClickListener();
      }
      this.unbindRipple();
    }


    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }


    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
      this.createSubscription = null;
    }


    if (this.onLangChange) {
      this.onLangChange.unsubscribe();
      this.onLangChange = null;
    }

    if (this.timeStampSubscription) {
      this.timeStampSubscription.unsubscribe();
      this.timeStampSubscription = null;
    }

  }


}

