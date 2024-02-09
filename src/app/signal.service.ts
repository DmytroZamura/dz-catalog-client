import { EventEmitter, Inject, Injectable, Output, PLATFORM_ID, Directive } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './config/config.service';
import {UtilsService} from './utils.service';
import {BoardData} from './dashboard/general-details-board/board-data';
import {FaviconsService} from './favicons.service';
import {isPlatformBrowser} from '@angular/common';
import {AggregatedFeedItem, Post} from './post/post';
import {Chat, Message} from './messaging/messaging';
import {SupplyRequest} from './supply-request/supply-request';
import {PostRespond} from './post/respond/post-respond';
import { CommunityInvitation, CommunityMember} from './community/community';




@Injectable({
  providedIn: 'root'
})
export class SignalService {
  @Output() unreadMessages: EventEmitter<number> = new EventEmitter();
  @Output() totalEventsQty: EventEmitter<BoardData> = new EventEmitter();
  @Output() newTimeLineActivity: EventEmitter<AggregatedFeedItem> = new EventEmitter();
  @Output() chatUpdate: EventEmitter<Chat> = new EventEmitter();
  @Output() chatViewed: EventEmitter<number> = new EventEmitter();
  @Output() newMessage: EventEmitter<Message> = new EventEmitter();
  @Output() newCustomerRequest: EventEmitter<SupplyRequest> = new EventEmitter();
  @Output() supplyRequestStatusChanged: EventEmitter<SupplyRequest> = new EventEmitter();
  @Output() newPostRespond: EventEmitter<PostRespond> = new EventEmitter();
  @Output() newYourPostRespond: EventEmitter<PostRespond> = new EventEmitter();
  @Output() newCommunityInvitation: EventEmitter<CommunityInvitation> = new EventEmitter();
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() postDeleted: EventEmitter<Post> = new EventEmitter();
  @Output() newCommunityMember: EventEmitter<CommunityMember> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() newTimeStamp: EventEmitter<void> = new EventEmitter();
  @Output() newInterfaceLanguage: EventEmitter<string> = new EventEmitter();

  @Output() newNotification: EventEmitter<any> = new EventEmitter();
  isBrowser = false;

   endpoint = AppConfig.settings.endPointUrl;


  constructor(public http: HttpClient, private favicons: FaviconsService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onLogout() {
    this.logout.emit();
  }

  createNotification(data) {

    this.newNotification.emit(data);
  }


  refreshTimeStamp() {
    this.newTimeStamp.emit();
  }


  refreshInterfaceLanguage(language: string) {
    this.newInterfaceLanguage.emit(language);
  }


  getMessagesCount(): Promise<any> {
    const url = `${this.endpoint}${'get-unread-messages-count/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }

  getTotalEventsQty(): Promise<BoardData> {
    const url = `${this.endpoint}${'get-total-events-qty/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as BoardData)
      .catch(UtilsService.handleError);

  }

  getCompanyMessagesCount(company: number): Promise<any> {
    const url = `${this.endpoint}${'get-company-unread-messages-count/'}${company}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }

  createNewTimelineActivity(activity: AggregatedFeedItem) {
    this.newTimeLineActivity.emit(activity);
  }

  createChatUpdate(chat: Chat) {
    this.chatUpdate.emit(chat);
  }

  createNewMessage(message: Message) {
    this.newMessage.emit(message);
  }

  createPostRespond(response: PostRespond) {
    this.newPostRespond.emit(response);
  }

    createYourPostRespond(response: PostRespond) {
    this.newYourPostRespond.emit(response);
  }

  createCustomerRequest(request: SupplyRequest) {
    this.newCustomerRequest.emit(request);
  }

  createCommunityInvitation(request: CommunityInvitation) {
    this.newCommunityInvitation.emit(request);
  }



  createCommunityMember(member: CommunityMember) {
    this.newCommunityMember.emit(member);
  }


  createNewPost(post: Post) {
    this.newPost.emit(post);
  }

  deletePost(post: Post) {
    this.postDeleted.emit(post);
  }


  updateSupplyRequestStatus(request: SupplyRequest) {
    this.supplyRequestStatusChanged.emit(request);
  }


  refreshUnreadMessages(chatId: number) {

    this.chatViewed.emit(chatId);

    this.refreshTotalEventsQty();

  }

  refreshTotalEventsQty() {
    const currentUserId = +localStorage.getItem('user_id');
    if (currentUserId) {
      this.getTotalEventsQty()
        .then(res => {
          this.totalEventsQty.emit(res);
          if (this.isBrowser) {
            if (res.notifications > 0) {
              this.favicons.activate('notification');
            } else {
              this.favicons.reset();
            }
          }

        })
        .catch(error => {
          console.log(error);
        });
    }


  }

}
