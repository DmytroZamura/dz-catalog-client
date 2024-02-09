import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {SignalService} from '../signal.service';
import {BrowserService} from '../browser.service';
import {NotificationsService} from './notifications.service';
import {AggregatedFeedItem} from '../post/post';

import {AppService} from '../app.service';
import * as stream from 'getstream';
import {AppConfig} from '../config/config.service';

import {GetStreamService} from '../get-stream.service';
import {StandardMessageService} from '../standard-message.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [MessageService]


})
export class NotificationComponent implements OnInit, OnDestroy {


  @Output() newNotificationItem = new EventEmitter<AggregatedFeedItem>();
  @Output() selectedChat = new EventEmitter<number>();

  isBrowser = false;
  currentUserId = 0;
  truncateNumber = 35;


  // getstream settings
  gettingToken = false;
  app_key = AppConfig.settings.stream_app_key;
  app_id = AppConfig.settings.stream_app_id;

  user_token: string;
  client: stream.Client;
  notificationsSubscription: any;
  notificationsSubscribed = false;


  showNotificationVerbs = ['user community_invitation', 'company_community_member',
    'user_community_member', 'community_administrator_created', 'community_administrator_deleted',
    'company community_invitation', 'user_customer_request_to_user',
    'company_customer_request_to_user', 'user_customer_request_to_company',
    'company_customer_request_to_company', 'user_customer_request_status',
    'user_customer_request_status_new',
    'user_customer_request_status_processing',
    'user_customer_request_status_completed',
    'user_customer_request_status_canceled',
    'user_customer_request_status_confirm',
    'user_customer_request_status_confirmed',
    'user_customer_request_status_c_canceled',
    'user_customer_request_status_confirmed_to_company',
    'user_customer_request_status_c_canceled_to_company',
    'company_customer_request_status_confirm',
    'company_customer_request_status_confirmed_to_company',
    'company_customer_request_status_c_canceled_to_company',
    'company_customer_request_status_confirmed',
    'company_customer_request_status_c_canceled',
    'company_customer_request_status_new',
    'company_customer_request_status_processing',
    'company_customer_request_status_completed',
    'company_customer_request_status_canceled',
    'company_administrator_created',
    'company_administrator_deleted',
    'job_post_response',
    'user offering_post_response',
    'company offering_post_response',
    'user request_post_response', 'company request_post_response',
    'user message', 'new_category',
    'company message'];

  postRespondVerbs = ['job_post_response',
    'user offering_post_response', 'company offering_post_response', 'user request_post_response', 'company request_post_response'];

  messageVerbs = ['user message',
    'company message'];

  timeLineVerbs = ['like', 'comment', 'comment_like'];
  customerRequestVerbs = ['user_customer_request_to_company', 'user_customer_request_to_user', 'company_customer_request_to_user',
    'company_customer_request_to_company'];

  supplierRequestStatusVerbs = ['user_customer_request_status_new',
    'user_customer_request_status_processing',
    'user_customer_request_status_completed',
    'user_customer_request_status_canceled',
    'user_customer_request_status_confirm',
    'user_customer_request_status_confirmed',
    'user_customer_request_status_c_canceled',
    'user_customer_request_status_confirmed_to_company',
    'user_customer_request_status_c_canceled_to_company',
    'company_customer_request_status_new',
    'company_customer_request_status_processing',
    'company_customer_request_status_completed',
    'company_customer_request_status_canceled',
    'company_customer_request_status_confirm',
    'company_customer_request_status_confirmed_to_company',
    'company_customer_request_status_c_canceled_to_company'];


  communityRequestVerbs = ['user community_invitation', 'company community_invitation'];
  private messageSubscription: Subscription;

  static playNotificationSound() {
    const audio = new Audio();
    audio.src = 'https://uacat-static.s3.eu-central-1.amazonaws.com/static/sounds/definite.mp3';
    audio.load();
    audio.play();
  }


  constructor(private browserService: BrowserService, private streamService: GetStreamService,
              private standardMessageService: StandardMessageService,
              private notificationsService: NotificationsService, private appService: AppService,
              public messageService: MessageService, private router: Router, private signalService: SignalService) {
    this.isBrowser = browserService.isBrowser;
  }


  ngOnInit() {


    if (this.appService.userProfile.user_id) {

      this.currentUserId = this.appService.userProfile.user_id;


      this.subscribeUser();

      this.messageSubscription = this.standardMessageService.messageAdded.subscribe(message => {

        this.messageService.add({key: 'message', severity: message.severity, summary: message.summary, detail: message.detail});


      });


    }

  }


  onShowChat(chat: number) {
    this.selectedChat.emit(chat);


  }


  subscribeUser() {
    if (this.isBrowser && !this.client && !this.gettingToken && !this.notificationsSubscribed) {
      this.gettingToken = true;
      this.notificationsSubscribed = true;
      this.streamService.getUserToken()
        .then(res => {
          this.gettingToken = false;

          this.user_token = res.token;


          this.client = stream.connect(this.app_key, null, this.app_id);

          const feed = this.client.feed('notification', this.currentUserId.toString(), this.user_token);


          this.notificationsSubscription = feed.subscribe(data => {

            if (this.appService.isAuthenticated()) {
              this.signalService.createNotification(data);
              this.processNotification(data);
            }

          }).then(this.successCallback, this.failCallback);


        })
        .catch(error => {
          this.gettingToken = false;
          console.log(error);
        });
    }

  }


  processNotification(res) {

    const notifications_new = res.new;
    this.messageService.clear();
    this.signalService.refreshTotalEventsQty();

    for (const notification of notifications_new) {


      this.notificationsService.enrichNotification(notification)
        .then(enriched => {

          const item = new AggregatedFeedItem();
          item.verb = enriched.verb;
          item.activity_count = 1;
          item.actor_count = 1;
          item.created_at = enriched.time;
          item.id = enriched.id;
          item.is_read = false;
          item.is_seen = false;
          item.activities = [];
          item.activities.push(enriched);

          this.newNotificationItem.emit(item);

          if (this.messageVerbs.includes(notification.verb)) {
            this.signalService.createChatUpdate(item.activities[0].target);
            this.signalService.createNewMessage(item.activities[0].object);
          }

          if (this.timeLineVerbs.includes(notification.verb)) {
            this.signalService.createNewTimelineActivity(item);
          }

          if (this.customerRequestVerbs.includes(notification.verb)) {

            this.signalService.createCustomerRequest(item.activities[0].object);
          }

          if (this.postRespondVerbs.includes(notification.verb)) {
            this.signalService.createPostRespond(item.activities[0].object);
          }

          if (this.supplierRequestStatusVerbs.includes(notification.verb)) {
            this.signalService.updateSupplyRequestStatus(item.activities[0].object);
          }

          if (this.communityRequestVerbs.includes(notification.verb)) {

            this.signalService.createCommunityInvitation(item.activities[0].object);
          }

          if (notification.verb === 'user_community_member') {
            this.signalService.createCommunityMember(item.activities[0].object);
          }

          if (this.appService.userProfile.notifications_sound) {
            NotificationComponent.playNotificationSound();

          }
          if (this.showNotificationVerbs.includes(notification.verb)) {

            if (!this.appService.userProfile.notifications_sound && this.appService.userProfile.message_sound) {
              if (this.messageVerbs.includes(notification.verb)) {
                NotificationComponent.playNotificationSound();

              }
            }


            this.messageService.add({
              key: 'notification',
              severity: '',
              summary: 'New notification',
              data: item
            });
          }


        })
        .catch(error => {
          console.log(error);
        });


    }

  }

  successCallback() {
    console.log('now listening to changes in realtime');

  }

  failCallback(data) {
    console.log('something went wrong, check the console logs');
    console.log(data);

  }

  deleteSessionData() {
    this.client = null;


    if (this.notificationsSubscription) {
      // this.notificationsSubscription.unsubscribe();
      this.notificationsSubscription = null;
    }

  }

  ngOnDestroy() {

    this.deleteSessionData();
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageSubscription = null;
    }
  }


}
