import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProfileShort, UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';
import {BoardData} from './board-data';

import {Router} from '@angular/router';
import {Post, PostType} from '../../post/post';
import {Subscription} from 'rxjs';
import {SignalService} from '../../signal.service';
import {PostRespond} from '../../post/respond/post-respond';
import {SupplyRequest} from '../../supply-request/supply-request';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-general-details-board',
  templateUrl: './general-details-board.component.html',
  styleUrls: ['./general-details-board.component.css']
})
export class GeneralDetailsBoardComponent implements OnInit, OnDestroy {
  @Input() userId = 0;
  @Input() postTypes: PostType[];
  @Input() companyId = 0;
  @Input() profile: ProfileShort;
  @Input() company: CompanyShort;
  @Input() locale = 'en';
  @Output() createPost = new EventEmitter<any>();


  private respondSubscription: Subscription;
  private postSubscription: Subscription;
  private deletePostSubscription: Subscription;
  private requestSubscription: Subscription;
  private statusSubscription: Subscription;
  private yourRespondSubscription: Subscription;

  data: BoardData;
  userDetails: UserWithProfile;
  showBoard = false;


  constructor(private service: GeneralService,
              private router: Router, private signalService: SignalService) {
  }

  ngOnInit() {


    if (this.company) {
      this.companyId = this.company.id;
    }

    if (this.profile || this.company) {
      this.initData();
    } else {
      if (this.companyId) {
        this.refreshCompanyData(this.companyId);
      } else {
        if (this.userId) {
          this.refreshProfileData(this.userId);
        }
      }
    }

    if (!this.postTypes) {
      this.getPostTypes();
    }

    this.respondSubscription = this.signalService.newPostRespond.subscribe(respond => {

      if (respond.post_details.company) {
        if (respond.post_details.company === this.companyId) {
          this.checkNewRespond(respond);
        }
      } else {
        if (respond.post_details.user === this.userId) {
          this.checkNewRespond(respond);
        }
      }
    });


    this.postSubscription = this.signalService.newPost.subscribe(post => {


      if (post.company) {

        if (post.company === this.companyId) {

          this.checkPostQTY(post, 1);
        }
      } else {
        if (post.user === this.userId) {

          this.checkPostQTY(post, 1);
        }
      }

    });


    this.deletePostSubscription = this.signalService.postDeleted.subscribe(post => {


      if (post.company) {

        if (post.company === this.companyId) {

          this.checkPostQTY(post, -1);
        }
      } else {
        if (post.user === this.userId) {

          this.checkPostQTY(post, -1);
        }
      }

    });


    this.requestSubscription = this.signalService.newCustomerRequest.subscribe(request => {

      if (request.supplier_company) {
        if (request.supplier_company === this.companyId) {
          this.data.new_customer_requests = this.data.new_customer_requests + 1;
          this.data.open_customer_requests = this.data.open_customer_requests + 1;
        }
      } else {
        if (request.supplier_user === this.userId) {
          this.data.new_customer_requests = this.data.new_customer_requests + 1;
          this.data.open_customer_requests = this.data.open_customer_requests + 1;
        }
      }


    });

    this.statusSubscription = this.signalService.supplyRequestStatusChanged.subscribe(status => {


      if (status.customer_company) {
        if (status.customer_company === this.company.id) {
          this.checkSupplyRequestStatus(status);
        }
      } else {
        if (status.customer_user === this.userId) {
          this.checkSupplyRequestStatus(status);
        }
      }


    });


    this.yourRespondSubscription = this.signalService.newYourPostRespond.subscribe(respond => {


      if (respond.company) {
        if (respond.company === this.companyId) {

          this.checkYourRespond(respond);
        }
      } else {
        if (respond.user === this.userId) {

          this.checkYourRespond(respond);
        }
      }

    });


  }

  checkSupplyRequestStatus(request: SupplyRequest) {
    if (request.status_details.code === 'completed' || request.status_details.code === 'canceled') {
      this.data.your_open_supply_requests = this.data.your_open_supply_requests - 1;
    }
  }

  checkPostQTY(post: Post, qty: number) {

    if (post.type_details.code === 'job') {
      this.data.jobposts = this.data.jobposts + qty;
    }

    if (post.type_details.code === 'offering') {
      this.data.offerings = this.data.offerings + qty;
    }

    if (post.type_details.code === 'request') {
      this.data.requests = this.data.requests + qty;
    }

  }

  checkNewRespond(respond: PostRespond) {


    if (respond.post_details.type_details.code === 'job') {
      this.data.new_job_responds = this.data.new_job_responds + 1;

    }

    if (respond.post_details.type_details.code === 'offering') {
      this.data.new_offering_reponds = this.data.new_offering_reponds + 1;

    }

    if (respond.post_details.type_details.code === 'request') {
      this.data.new_request_responds = this.data.new_request_responds + 1;

    }

  }

  checkYourRespond(respond: PostRespond) {

    if (respond.post_details.type_details.code === 'job') {
      this.data.your_open_job_responds = this.data.your_open_job_responds + 1;

    }

    if (respond.post_details.type_details.code === 'offering') {
      this.data.your_open_offering_responds = this.data.your_open_offering_responds + 1;

    }

    if (respond.post_details.type_details.code === 'request') {
      this.data.your_open_request_responds = this.data.your_open_request_responds + 1;

    }
  }


  ngOnDestroy() {


    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
      this.requestSubscription = null;
    }
    if (this.respondSubscription) {
      this.respondSubscription.unsubscribe();
      this.respondSubscription = null;
    }

    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
      this.statusSubscription = null;
    }

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
      this.postSubscription = null;
    }

    if (this.deletePostSubscription) {
      this.deletePostSubscription.unsubscribe();
      this.deletePostSubscription = null;
    }

    if (this.yourRespondSubscription) {
      this.yourRespondSubscription.unsubscribe();
      this.yourRespondSubscription = null;
    }

  }

  getPostTypes() {


    const url = `${'post-types'}`;
    this.service.getItems(url)
    .then(types => {


        this.postTypes = types;


      })
      .catch(error => {
        console.log(error);
      });


  }

  onItemClick(name: string) {
    if (name === 'customer-requests') {
      if (this.company) {

        this.router.navigate(['/requests/supplier/' + this.company.id]);

      } else {


        this.router.navigate(['/requests/supplier/']);

      }


    }

    if (name === 'open-supply-requests') {
      if (this.company) {

        this.router.navigate(['/requests/customer/' + this.company.id]);

      } else {


        this.router.navigate(['/requests/customer/']);

      }


    }


    if (name === 'products') {
      if (this.company) {

        this.router.navigate(['/company-admin/' + this.company.slug + '/2']);

      } else {


        this.router.navigate(['/profile/2']);

      }


    }

    if (name === 'job' || name === 'offering' || name === 'request') {
      if (this.company) {

        this.router.navigate(['/company-admin/' + this.company.slug + '/1'], {queryParams: {'post_type': name}});

      } else {


        this.router.navigate(['/profile/1'], {queryParams: {'post_type': name}});

      }


    }

    if (name === 'job-responds') {
      if (this.company) {

        this.router.navigate(['/responds/responder/job/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/responder/job/']);

      }
    }

    if (name === 'offering-responds') {
      if (this.company) {

        this.router.navigate(['/responds/responder/offering/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/responder/offering/']);

      }


    }

    if (name === 'request-responds') {
      if (this.company) {

        this.router.navigate(['/responds/responder/request/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/responder/request/']);

      }


    }

    if (name === 'job-applicants') {
      if (this.company) {

        this.router.navigate(['/responds/owner/job/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/owner/job/']);

      }

    }

    if (name === 'offering-applicants') {
      if (this.company) {

        this.router.navigate(['/responds/owner/offering/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/owner/offering/']);

      }

    }

    if (name === 'request-applicants') {
      if (this.company) {

        this.router.navigate(['/responds/owner/request/' + this.company.id]);

      } else {


        this.router.navigate(['/responds/owner/request/']);

      }

    }


  }


  onCreatePost(typeCode: string) {

    if (this.postTypes) {
      for (const type of this.postTypes) {
        if (type.code === typeCode) {

          this.createPost.emit({type: type, company: this.companyId});
          break;

        }

      }
    }
  }

  refreshCompanyData(id: number) {

    this.showBoard = false;
      const url = `${'get-company-details-short/'}${id}`;
      this.service.getItem(url)
    .then(res => {

        this.company = res;
        this.companyId = res.id;
        this.userId = null;
        this.profile = null;
        this.initData();


      })
      .catch(error => {
        console.log(error);
      });


  }

  setUserData() {

    if (!this.userId) {
      this.userId = this.profile.user_id;
    }

    if (!this.userDetails) {
      this.userDetails = new UserWithProfile();
    }

    this.userDetails.user_profile = this.profile;
    this.userDetails.user_profile_default = this.profile;
  }

  refreshProfileData(id: number) {
    this.showBoard = false;

    const url = `${'get-short-user-profile/'}${id}`;
    this.service.getItem(url)
    .then(res => {

        this.profile = res;
        this.userId = res.user_id;
        this.companyId = null;
        this.company = null;
        this.initData();


      })
      .catch(error => {
        console.log(error);
      });



  }

  initData() {

    if (!this.data) {
      this.data = new BoardData();
    }
    if (this.company) {
      if (!this.companyId) {
        this.companyId = this.company.id;
      }
      this.data.products = this.company.eventsqty.products;
      this.data.new_customer_requests = this.company.eventsqty.new_customer_requests;
      this.data.open_customer_requests = this.company.eventsqty.open_customer_requests;
      this.data.jobposts = this.company.eventsqty.jobposts;
      this.data.new_job_responds = this.company.eventsqty.new_job_responds;
      this.data.offerings = this.company.eventsqty.offerings;
      this.data.new_offering_reponds = this.company.eventsqty.new_offering_reponds;
      this.data.requests = this.company.eventsqty.requests;
      this.data.new_request_responds = this.company.eventsqty.new_request_responds;
      this.data.your_open_supply_requests = this.company.eventsqty.your_open_supply_requests;
      this.data.your_open_offering_responds = this.company.eventsqty.your_open_offering_responds;
      this.data.your_open_request_responds = this.company.eventsqty.your_open_request_responds;
      this.userDetails = null;

    } else {
      if (this.profile) {

        this.setUserData();
        this.data.products = this.profile.eventsqty.products;
        this.data.new_customer_requests = this.profile.eventsqty.new_customer_requests;
        this.data.open_customer_requests = this.profile.eventsqty.open_customer_requests;
        this.data.jobposts = this.profile.eventsqty.jobposts;
        this.data.new_job_responds = this.profile.eventsqty.new_job_responds;
        this.data.offerings = this.profile.eventsqty.offerings;
        this.data.new_offering_reponds = this.profile.eventsqty.new_offering_reponds;
        this.data.requests = this.profile.eventsqty.requests;
        this.data.new_request_responds = this.profile.eventsqty.new_request_responds;
        this.data.your_open_supply_requests = this.profile.eventsqty.your_open_supply_requests;
        this.data.your_open_offering_responds = this.profile.eventsqty.your_open_offering_responds;
        this.data.your_open_request_responds = this.profile.eventsqty.your_open_request_responds;
        this.data.your_open_job_responds = this.profile.eventsqty.your_open_job_responds;
      }
    }
    this.showBoard = true;
  }

}
