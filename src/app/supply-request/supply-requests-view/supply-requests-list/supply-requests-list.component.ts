import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';

import {UniversalFilter} from '../../../common/universal-filter';
import {CommonItem} from '../../../general/common-item';

import {Subscription} from 'rxjs';
import {AppFilterService} from '../../../app-filter.service';
import {isPlatformBrowser} from '@angular/common';
import {SupplyRequest} from '../../supply-request';
import {AppComponent} from '../../../app.component';
import {SignalService} from '../../../signal.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {GeneralService} from '../../../general/general.service';


@Component({
  selector: 'app-supply-requests-list',
  templateUrl: './supply-requests-list.component.html',
  styleUrls: ['./supply-requests-list.component.css']
})
export class SupplyRequestsListComponent implements OnInit, OnDestroy {

  @Input() companyId: number;
  @Input() currentUserId = 0;
  @Input() orderingCode = '-id';
  @Input() locale = 'en';
  @Input() userType: string; // - supplier, customer
  // @ViewChild('chat') chatComponent: any;
  private subscription: Subscription;
  private requestSubscription: Subscription;
  requests: SupplyRequest[];

  loading = false;

  keyword: string;
  page = 0;
  filter = '';
  // showChat = false;
  appliedFilter: UniversalFilter;
  isBrowser = false;
  // msgs: Message[];
  requestsFinished = false;
  initialization = false;
  statuses: CommonItem[];
  isMobile = false;


  constructor(public app: AppComponent, private service: GeneralService,
              private deviceService: DeviceDetectorService, @Inject(LOCAL_STORAGE) private localStorage: any,
              @Inject(PLATFORM_ID) private platformId: Object, private filterService: AppFilterService, private signalService: SignalService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
     this.locale = this.localStorage.getItem('language_code');
  }

  ngOnInit() {


    this.getRequestStatuses();


    this.subscription = this.filterService.filterApplied.subscribe(filter => {


      this.appliedFilter = filter;

      if (this.initialization) {
        this.initNewFilter();
      }

    });


    if (this.userType === 'supplier') {
      this.requestSubscription = this.signalService.newCustomerRequest.subscribe(request => {

        if (request.supplier_company === this.companyId || request.supplier_user === this.currentUserId) {
          this.addItem(request);
        }
      });
    }


    this.filterService.initNavigation(12, null, 'supply-requests');


  }


  initNewFilter() {

    this.requests = [];
    this.page = 0;


    this.requestsFinished = false;

    this.getRequests();
  }

  changeOrdering(code: string) {

    this.orderingCode = code;
    this.initNewFilter();
  }

  changeListMainFilter(company: number, userType: string) {
    this.userType = userType;
    if (company) {
      this.companyId = company;
    } else {
      this.companyId = null;
    }
    this.initialization = true;
    this.initNewFilter();
  }

  setKeyword(keyword: string) {
    this.keyword = keyword;
    this.initNewFilter();
  }


  formFilter() {

    let filter_str = '?';

    if (this.keyword) {
      filter_str = filter_str + '&keyword=' + this.keyword;
    }

    if (this.appliedFilter) {


      if (this.appliedFilter.country) {
        filter_str = filter_str + '&country=' + this.appliedFilter.country.id;

      }
      if (this.appliedFilter.city) {
        filter_str = filter_str + '&city=' + this.appliedFilter.city.id;

      }

      if (this.appliedFilter.requestStatus) {
        filter_str = filter_str + '&status=' + this.appliedFilter.requestStatus.id;

      }


    }

    this.filter = filter_str;


  }


  getRequests() {
    if (!this.requestsFinished) {
      this.formFilter();
      this.loading = true;
      this.filterService.onLoadingStarted();

      if (this.userType === 'customer') {
        if (this.companyId) {
            const url = `$${'get-company-supply-requests/'}${this.companyId}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
          .then(res => {


              this.addItems(res);
              this.filterService.onLoadingFinished();

            })
            .catch(error => {

              console.log(error);
            });


        } else {
              const url = `${'get-user-supply-requests/'}${this.page}${'/'}${this.orderingCode}`;
              this.service.getItems(url, this.filter)
           .then(res => {


              this.addItems(res);
              this.filterService.onLoadingFinished();

            })
            .catch(error => {

              console.log(error);
            });


        }
      }


      if (this.userType === 'supplier') {
        if (this.companyId) {
            const url = `${'get-company-sales-requests/'}${this.companyId}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
           .then(res => {


              this.addItems(res);
              this.filterService.onLoadingFinished();

            })
            .catch(error => {

              console.log(error);
            });

        } else {

           const url = `${'get-user-sales-requests/'}${this.page}${'/'}${this.orderingCode}`;
           this.service.getItems(url, this.filter)
           .then(res => {


              this.addItems(res);
              this.filterService.onLoadingFinished();

            })
            .catch(error => {

              console.log(error);
            });


        }
      }


    }
  }

  addItem(item: SupplyRequest) {


    if (!this.loading) {
      if (!this.requests) {
        this.requests = [];
        this.requests.push(item);
      } else {
        this.requests.splice(0, 0, item);


      }

    }
  }

  addItems(items: SupplyRequest[]) {
    if (!this.requests) {
      this.requests = items;
    } else {

      this.requests = this.requests.concat(items);
    }

    if (items[9]) {


      this.page = this.page + 1;
    } else {
      this.requestsFinished = true;

    }


    this.loading = false;


  }


  onShowChat(chat: number) {

    this.app.onShowChat(chat);


  }

  getRequestStatuses() {

      const url = `${'supply-request-statuses'}`;
      this.service.getItems(url)
     .then(res => {


        this.statuses = res;


      })
      .catch(error => {
        console.log(error);
      });


  }


  onItemFocus() {

    if (!this.requestsFinished && !this.loading) {
      this.getRequests();
    }

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
        this.subscription = null;
    }

    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
      this.requestSubscription = null;
    }
  }



}
