import {EventEmitter, Inject, Injectable, Output, PLATFORM_ID} from '@angular/core';

import {Profile} from './profile/profile';
import {LanguageService} from './general/language.service';
import {isPlatformBrowser} from '@angular/common';
import {BoardData} from './dashboard/general-details-board/board-data';
import {CommonItem} from './general/common-item';
import {JoyrideService} from 'ngx-joyride';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Router} from '@angular/router';

enum MenuOrientation {
  STATIC,
  OVERLAY
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() createObject: EventEmitter<string> = new EventEmitter();

  public userProfile = new Profile();

  user: string;
  timestamp: string;
  signedIn = false;
  isBrowser = false;
  showChat = false;
  currentChatId = 0;
  showAuthDialog = false;

  activeTabIndex: number;

  sidebarActive: boolean;
  showSidebarContent = false;

  layoutMode: MenuOrientation = MenuOrientation.STATIC;

  darkMenu = false;

  topbarMenuActive: boolean;

  sidebarClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;
  selectedChat: any;

  postTypeName = '';
  showCreatePostDialog = false;
  postTypes: CommonItem[];
  publishButtonDisabled = false;
  showRoleDialog = false;
  showProductDialog = false;
  showCompanyDialog = false;
  selectedCompany: number;
  productCreating = false;
  postCreating = false;
  articleCreating = false;
  currentPostCode: string;

  totalEventsQty = new BoardData();

  loadingLazyElements = false;
  loadingIcons = false;
  showWelcomeDialog = false;
  sideBarLoad = false;
  startAuth = false;
  token: string;
  currentUserId = 0;

  prevText = 'prev';
  nextText = 'next';
  doneText = 'done';

  onboarding = false;
  routeReady = false;


  constructor(public languageService: LanguageService, @Inject(PLATFORM_ID) private platformId: any,
              private readonly joyrideService: JoyrideService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.languageService.initLanguages();
  }

  setLanguage() {

    this.languageService.setLanguage();

  }

  initRoutings() {
    if (!this.routeReady) {
      this.routeReady = true;
      // this.router.initialNavigation();
    }
  }

  checkWelcomeMessage() {

    if (!this.isAuthenticated()) {
      const welcomeMessage = this.localStorage.getItem('welcomeMessage');

      if (!welcomeMessage) {
        this.localStorage.setItem('welcomeMessage', '1');
        this.showWelcomeMessage();
      }
    }
  }

  showWelcomeMessage() {

    this.showWelcomeDialog = true;


  }

  startFirstTour(event) {

    const texts = {prev: this.prevText, next: this.nextText, done: this.doneText};
    this.onboarding = true;
    this.joyrideService.startTour(
      {steps: ['filter', 'navigator', 'search', 'create', 'login'], themeColor: '#009688', customTexts: texts} // Your steps order
    ).subscribe(
      step => {
        this.onboarding = true;
      },
      error => {
        this.onboarding = false;
      },
      () => {
        this.onboarding = false;
      }
    );
  }

  startMobileFirstTour() {
    const texts = {prev: this.prevText, next: this.nextText, done: this.doneText};
    this.onboarding = true;
    this.joyrideService.startTour(
      {steps: ['mobileFilter', 'navigator', 'search', 'mobileLogin'], themeColor: '#009688', customTexts: texts} // Your steps order
    ).subscribe(
      step => {
        this.onboarding = true;
      },
      error => {
        this.onboarding = false;
      },
      () => {
        this.onboarding = false;
      }
    );
  }

  public isAuthenticated(): boolean {


    if (this.isBrowser) {


      const user = localStorage.getItem('user_id');
      if (user) {
        return true;
      } else {
        return false;
      }


    } else {
      return false;
    }

  }

  public isCanActivate(): boolean {

    if (this.isBrowser) {


      const user = localStorage.getItem('user_id');
      if (user) {
        return true;
      } else {
        return false;
      }


    } else {
      return false;
    }

    // Check whether the token is expired and return
    // true or false

  }

  newObject(type: string) {
    this.createObject.emit(type);
  }

  newTimestamp() {

    const date = new Date();
    this.timestamp = `${date.getTime()}`;


  }


  getCurrentChatId(): number {
    if (this.showChat) {
      return this.currentChatId;
    } else {
      return 0;
    }
  }


  onTabClick(event: Event, index: number) {

    this.sideBarLoad = true;
    if (this.activeTabIndex === index) {
      this.sidebarActive = !this.sidebarActive;
    } else {
      this.activeTabIndex = index;
      this.sidebarActive = true;
    }


    if (this.sidebarActive) {
      this.showSidebarContent = true;
    }

    if (event) {
      event.preventDefault();
    }
    // console.log(event);
    // console.log(this.activeTabIndex);
    // console.log(this.sidebarActive);
    // console.log(this.showSidebarContent);
  }

  closeSidebar(event: Event) {
    this.sidebarActive = false;
    event.preventDefault();
  }

  onSidebarClick($event) {
    this.sidebarClick = true;
  }

  onTopbarMenuButtonClick(event) {

    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }


}
