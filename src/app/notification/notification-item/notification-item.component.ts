import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AggregatedFeedItem, getPostLink} from '../../post/post';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() item: AggregatedFeedItem;
  @Input() currentUserId = 0;
  @Input() truncateNumber = 18;
  @Input() siteUrl = 'https://www.uafine.com';
  @Input() locale = 'en';
  @Output() chatSelected = new EventEmitter<number>();
  @Output() itemClicked = new EventEmitter<void>();


  commonVerbs = ['like', 'comment', 'comment_like', 'company_follower', 'followcompany', 'profile_follower', 'user community_invitation', 'company_community_member',
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
    'company_customer_request_status_new',
    'company_customer_request_status_processing',
    'company_customer_request_status_completed',
    'company_customer_request_status_canceled',
    'company_customer_request_status_confirm',
    'company_customer_request_status_confirmed',
    'company_customer_request_status_c_canceled',
    'company_customer_request_status_confirmed_to_company',
    'company_customer_request_status_c_canceled_to_company',
    'company_administrator_created',
    'company_administrator_deleted',
    'job_post_response',
    'user message',
    'company message',
    'user offering_post_response',
    'company offering_post_response',
    'user request_post_response', 'company request_post_response', 'category_suggested', 'new_category'];
  communityVerbs = ['user community_invitation', 'user_community_member',
    'community_administrator_created', 'community_administrator_deleted',
    'company community_invitation', 'company_community_member'];

  purshaseRequestStatusVerbs = ['user_customer_request_status', 'user_customer_request_status_new',
    'user_customer_request_status_confirm',
    'user_customer_request_status_processing',
    'user_customer_request_status_completed',
    'user_customer_request_status_canceled',
    'company_customer_request_status_new',
    'company_customer_request_status_confirm',
    'company_customer_request_status_processing',

    'company_customer_request_status_completed',
    'company_customer_request_status_canceled'];

  customerRequestStatusVerbsToCompany = [
    'user_customer_request_status_confirmed_to_company',
    'user_customer_request_status_c_canceled_to_company',
    'company_customer_request_status_confirmed_to_company',
    'company_customer_request_status_c_canceled_to_company'];
  customerRequestStatusVerbsToUser = [
    'user_customer_request_status_confirmed',
    'user_customer_request_status_c_canceled',
    'company_customer_request_status_confirmed',
    'company_customer_request_status_c_canceled'];

  postPreviewVerbs = ['user request_post_response', 'company request_post_response', 'user offering_post_response',
    'company offering_post_response', 'like', 'comment', 'job_post_response'];

  companyVerbs = ['company_administrator_created', 'company_administrator_deleted'];


  previewLink: string;

  constructor() {
  }

  ngOnInit() {
    if (this.postPreviewVerbs.includes(this.item.verb)) {
      this.previewLink = getPostLink(this.item.activities[0].target);
    }

    if (this.item.verb === 'comment_like') {
      this.previewLink = '/post/' + this.item.activities[0].target.post;
    }
  }

  onShowChat(chat: number) {

    this.itemClicked.emit();
    this.chatSelected.emit(chat);


  }

  onItemClicked() {
    this.itemClicked.emit();
  }

}
