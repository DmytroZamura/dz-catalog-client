import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../post/post';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {

  @Input() activities: Activity[];
  @Input() verb: string;
  @Input() currentUserId = 0;
  @Input() truncateNumber = 28;
  @Input() showFirstProfileFull = true;
  @Input() actorIsCompany = false;
  @Input() locale = 'en';
  @Output() itemClicked = new EventEmitter<void>();


  @Input() firstProfileFullVerbs = ['user_community_member', 'community_administrator_created', 'community_administrator_deleted',
    'company_administrator_created',
    'company_administrator_deleted'];
  @Input() companyActorVerbs = ['company community_invitation', 'company_community_member', 'company_customer_request_to_user',
    'company_customer_request_to_company', 'company_customer_request_status_new',
    'company_customer_request_status_processing',
    'company_customer_request_status_completed',
    'company_customer_request_status_canceled',
    'company_customer_request_status_confirm',
    'company_customer_request_status_confirmed',
    'company_customer_request_status_c_canceled',
    'company_customer_request_status_confirmed_to_company',
    'company_customer_request_status_c_canceled_to_company',
    'company message', 'company offering_post_response', 'company request_post_response', 'category_suggested', 'new_category'];

  @Input() customerRequestVerbs = ['user_customer_request_to_user', 'company_customer_request_to_user',
    'user_customer_request_to_company', 'company_customer_request_to_company'];


  @Input() purshaseRequestStatusVerbs = ['user_customer_request_status', 'user_customer_request_status_new',
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
    'company_customer_request_status_c_canceled_to_company'];

  @Input() onlyFirstActorVerbs = ['company_community_member',
    'user_community_member', 'community_administrator_created', 'community_administrator_deleted',
    'user_customer_request_to_user',
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
    'user message',
    'company message'];

  constructor() {
  }

  ngOnInit() {

    if (this.firstProfileFullVerbs.includes(this.verb)) {
      this.showFirstProfileFull = false;
    }

    if (this.companyActorVerbs.includes(this.verb)) {
      this.actorIsCompany = true;
    }

    if (this.onlyFirstActorVerbs.includes(this.verb)) {


      if (this.activities.length > 1) {
        this.activities.splice(1, this.activities.length - 1);
      }
    }
  }

  onItemClicked() {
    this.itemClicked.emit();
  }


}
