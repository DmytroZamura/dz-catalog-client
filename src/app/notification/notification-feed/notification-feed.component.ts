import {Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';

import {NotificationsService} from '../notifications.service';
import {MetaService} from '../../meta.service';
import {AggregatedFeedItem} from '../../post/post';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isPlatformBrowser} from '@angular/common';


import {Message} from 'primeng/api';
import {AppConfig} from '../../config/config.service';







@Component({
  selector: 'app-notification-feed',
  templateUrl: './notification-feed.component.html',
  styleUrls: ['./notification-feed.component.css']
})
export class NotificationFeedComponent implements OnInit, OnDestroy {
  siteUrl = AppConfig.settings.redirectUri;
  @Input() currentUserId = 0;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @Output() selectedChat = new EventEmitter<number>();
  @Output() seenNotifications = new EventEmitter<any>();


  feedItems: AggregatedFeedItem[];

  isMobile = false;
  truncateNumber = 60;
  isBrowser = false;
  feed_page = 0;
  feedFinished = false;
  loading = true;
  visibleSidebar1 = false;
  shouldTop = false;
  msgs: Message[];
  actionsChecked = false;
  locale = 'en';


  constructor(private notificationsService: NotificationsService, private metaService: MetaService,
              @Inject(LOCAL_STORAGE) private localStorage: any, private deviceService: DeviceDetectorService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.locale = this.localStorage.getItem('language_code');
  }

  ngOnInit() {

    if (this.isBrowser) {

      if (this.isMobile) {
        this.truncateNumber = 35;
      }

      if (!this.currentUserId) {
        this.currentUserId = +localStorage.getItem('user_id');
      }



    }
  }

  ngOnDestroy() {


  }

  gotoTop() {
    if (this.shouldTop) {
      this.scrollContainer.nativeElement.scrollTo(0, 0);
      this.shouldTop = false;
    }
  }


  onShowChat(chat: number) {

    this.selectedChat.emit(chat);


  }

  onScrolled(event) {

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 20) {
      if (!this.loading) {
        this.getNotificationsFeed();
      }
    }
  }

  @Input() set showBar(state: boolean) {

      this.showNotificationsBar();
  }

  showNotificationsBar() {

    this.visibleSidebar1 = !this.visibleSidebar1;

    if (this.visibleSidebar1) {
      if (this.shouldTop) {
        this.gotoTop();
      }


      if (this.visibleSidebar1 && !this.feedItems) {
           this.getNotificationsFeed();
      }
      this.setSeenProfileNotifications();
    }
  }

  getNotificationsFeed() {


    if (this.currentUserId && !this.feedFinished) {
      this.loading = true;
      this.notificationsService.getNotificationsFeed(this.feed_page, this.currentUserId)
        .then(result => {

          if (!this.feedItems) {
            this.feedItems = result;
            this.checkActions();
          } else {

            this.feedItems = this.feedItems.concat(result);
          }


          if (result[9]) {

            this.feed_page = this.feed_page + 1;
          } else {
            // this.showFeed = true;
            this.feedFinished = true;

          }
          this.loading = false;

        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });

    }


  }


  checkActions() {

    if (!this.actionsChecked) {
      this.notificationsService.checkUserActions()
        .then(result => {

          this.actionsChecked = true;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  }


  setSeenProfileNotifications() {
    this.notificationsService.setSeenProfileNotifications()
      .then(res => {

        this.seenNotifications.emit(res);

      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      });
  }

   @Input() set notification(item: AggregatedFeedItem) {

      this.addNotification(item);
  }

  addNotification(item: AggregatedFeedItem) {

    if (!this.loading && this.feedItems) {
      if (!this.feedItems) {
        this.feedItems = [];
        this.feedItems.push(item);
      } else {
        this.feedItems.splice(0, 0, item);
        this.shouldTop = true;


      }

    }
  }

  closeFeed() {
    this.visibleSidebar1 = false;
  }



}
