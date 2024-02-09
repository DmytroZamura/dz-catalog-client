import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';

import {AppFilterService} from '../app-filter.service';
import {isPlatformBrowser} from '@angular/common';

import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {NavigationWidgetComponent} from './navigation-widget/navigation-widget.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {SignalService} from '../signal.service';
import {Subscription} from 'rxjs';
import {AppService} from '../app.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent implements OnInit, OnDestroy {


  private logoutSubscription: Subscription;
  @ViewChild('navigation') navigationComponent: NavigationWidgetComponent;
  @ViewChild('chatsList') chatsListComponent: any;
  @Output() selectedChat = new EventEmitter<any>();
  isBrowser = false;
  currentUserId = 0;
  date = new Date();
  navigationObject = 1; // 1 - Feed, 2 - Companies, 3 - Products, 4 - Communities, 5 - People, 6- Company, 61 - Company posts, 62 - Company products, 7 - UserProfile, 71 - Profile posts, 72 - Profile products, 8 - Community
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
              private signalService: SignalService,
              public appService: AppService, private filterService: AppFilterService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit() {
    // this.isMobile = this.deviceService.isMobile();
    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }





    this.logoutSubscription = this.signalService.logout.subscribe(res => {

      this.appService.activeTabIndex = 0;


    });

  }

  onNewNavigationObject(obj: number) {
    this.navigationObject = obj;
      if (this.isBrowser) {
        const currentUser = +localStorage.getItem('user_id');
        if (this.currentUserId !== currentUser) {
          this.currentUserId = currentUser;

        }
      }
  }

  showChatDialog(event) {

    this.selectedChat.emit(event);
  }

  ngOnDestroy() {




     if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
      this.logoutSubscription = null;
    }


  }

  onFilterApplied(event) {
    this.filterService.applyFilter(event);
  }

  onRoleSelected(role) {

    if (this.chatsListComponent) {

      this.chatsListComponent.nativeElement.selectedRole = role;
    }
  }



  // onMsgPushed(event) {
  //   this.msgs = [];
  //   this.msgs.push(event);
  //
  // }

}
