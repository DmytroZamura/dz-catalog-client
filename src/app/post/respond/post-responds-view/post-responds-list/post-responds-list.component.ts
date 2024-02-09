import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {Subscription} from 'rxjs';
import {UniversalFilter} from '../../../../common/universal-filter';
import {AppFilterService} from '../../../../app-filter.service';
import {isPlatformBrowser} from '@angular/common';
import {PostRespond} from '../../post-respond';
import {CommonItem} from '../../../../general/common-item';
import {SignalService} from '../../../../signal.service';
import {AppComponent} from '../../../../app.component';
import {GeneralService} from '../../../../general/general.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';


@Component({
  selector: 'app-post-responds-list',
  templateUrl: './post-responds-list.component.html',
  styleUrls: ['./post-responds-list.component.css']
})
export class PostRespondsListComponent implements OnInit, OnDestroy {
  @Input() postType: string; // - job, offering, request
  @Input() userType: string; // - owner, responder
  @Input() post: number;
  @Input() company: number;
  @Input() orderingCode = '-id';
  @Input() currentUserId: number;
  @Output() newMinus = new EventEmitter<void>();

  private subscription: Subscription;
  private respondSubscription: Subscription;
  responds: PostRespond[];
  loading = false;

  keyword: string;
  page = 0;
  filter = '';
  appliedFilter: UniversalFilter;
  isBrowser = false;
  respondsFinished = false;
  statuses: CommonItem[];
   locale = 'en';


  constructor(private service: GeneralService,
              public app: AppComponent,
              @Inject(PLATFORM_ID) private platformId: Object, @Inject(LOCAL_STORAGE) private localStorage: any,
              private filterService: AppFilterService, private signalService: SignalService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.locale = this.localStorage.getItem('language_code');
    if (!this.locale) {
      this.locale = 'en';
    }
  }

  ngOnInit() {


    if (this.postType === 'job') {

      this.getApplicantStatuses();
    } else {

      this.getPostRespondStatuses();
    }


    this.subscription = this.filterService.filterApplied.subscribe(filter => {


      this.appliedFilter = filter;

      if (this.postType && this.userType) {
        this.initNewFilter();
      }


    });

    if (this.userType === 'owner') {

      this.respondSubscription = this.signalService.newPostRespond.subscribe(respond => {


        if (this.post === respond.post || (respond.post_details.type_details.code === this.postType &&
          (respond.post_details.company === this.company || respond.post_details.user === this.currentUserId))) {
          this.addItem(respond);
        }

      });
    }


    if (this.postType && this.userType) {
      this.initNavigation();
    }


  }


  onNewMinus() {
    this.newMinus.emit();
  }

  addItem(item: PostRespond) {


    if (!this.loading) {
      if (!this.responds) {
        this.responds = [];
        this.responds.push(item);
      } else {
        this.responds.splice(0, 0, item);


      }

    }
  }

  initNavigation() {
    if (this.postType === 'job') {
      this.filterService.initNavigation(10, null, this.postType);
    } else {
      this.filterService.initNavigation(11, null, this.postType);
    }

  }

  changeMainFilter(companyId: number, postType: string, userType: string) {
    this.company = companyId;
    this.postType = postType;
    this.userType = userType;
    this.initNavigation();
    // this.initNewFilter();
  }

  initNewFilter() {

    this.responds = [];
    this.page = 0;


    this.respondsFinished = false;

    this.getPostResponds();
  }

  changeOrdering(code: string) {

    this.orderingCode = code;
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


      if (this.appliedFilter.job_type) {
        filter_str = filter_str + '&job_type=' + this.appliedFilter.job_type.id;

      }

      if (this.appliedFilter.job_function) {
        filter_str = filter_str + '&job_function=' + this.appliedFilter.job_function.id;

      }

      if (this.appliedFilter.seniority_label) {
        filter_str = filter_str + '&seniority_label=' + this.appliedFilter.seniority_label.id;

      }

      if (this.appliedFilter.applicantStatus) {
        filter_str = filter_str + '&applicant_status=' + this.appliedFilter.applicantStatus.id;

      }

      if (this.appliedFilter.respondStatus) {
        filter_str = filter_str + '&respond_status=' + this.appliedFilter.respondStatus.id;

      }


      if (this.appliedFilter.job_type) {
        filter_str = filter_str + '&job_type=' + this.appliedFilter.job_type.id;

      }

      if (this.appliedFilter.job_function) {
        filter_str = filter_str + '&job_function=' + this.appliedFilter.job_function.id;

      }

      if (this.appliedFilter.seniority_label) {
        filter_str = filter_str + '&seniority_label=' + this.appliedFilter.seniority_label.id;

      }


    }

    this.filter = filter_str;


  }


  getPostResponds() {
    if (!this.respondsFinished) {
      this.formFilter();
      this.loading = true;

      if (this.postType === 'job') {
        if (this.post) {

          const url = `${'post-applicants/'}${this.post}${'/'}${this.page}${'/'}${this.orderingCode}`;
          this.service.getItems(url, this.filter)
            .then(res => {


              this.addResponds(res);

            })
            .catch(error => {

              console.log(error);
            });


        } else {
          if (this.company) {
            const url = `${'company-applicants/'}${this.company}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
              .then(res => {

                this.addResponds(res);

              })
              .catch(error => {

                console.log(error);
              });


          } else {
            const url = `${'user-applicants/'}${this.userType}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
              .then(res => {


                this.addResponds(res);

              })
              .catch(error => {

                console.log(error);
              });


          }
        }
      } else {
        if (this.post) {
          const url = `${'post-responds/'}${this.post}${'/'}${this.page}${'/'}${this.orderingCode}`;
          this.service.getItems(url, this.filter)
            .then(res => {


              this.addResponds(res);

            })
            .catch(error => {

              console.log(error);
            });


        } else {
          if (this.company) {
            const url = `${'company-responds/'}${this.company}${'/'}${this.postType}${'/'}${this.userType}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
              .then(res => {


                this.addResponds(res);

              })
              .catch(error => {

                console.log(error);
              });


          } else {
            const url = `${'user-responds/'}${this.postType}${'/'}${this.userType}${'/'}${this.page}${'/'}${this.orderingCode}`;
            this.service.getItems(url, this.filter)
              .then(res => {


                this.addResponds(res);

              })
              .catch(error => {

                console.log(error);
              });

          }

        }
      }
    }
  }


  addResponds(items: PostRespond[]) {

    if (!this.responds) {
      this.responds = items;
    } else {

      this.responds = this.responds.concat(items);
    }

    if (items[9]) {


      this.page = this.page + 1;
    } else {
      this.respondsFinished = true;

    }


    this.loading = false;
  }

  onShowChat(chat: number) {

    this.app.onShowChat(chat);

  }

  getApplicantStatuses() {

    const url = `${'applicant-statuses'}`;
    this.service.getItems(url)
      .then(res => {


        this.statuses = res;


      })
      .catch(error => {
        console.log(error);
      });


  }

  getPostRespondStatuses() {

    const url = `${'post-respond-statuses'}`;
    this.service.getItems(url)
      .then(res => {

        this.statuses = res;

      })
      .catch(error => {
        console.log(error);
      });


  }


  onItemFocus() {
    if (!this.respondsFinished && !this.loading) {
      this.getPostResponds();
    }

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.respondSubscription) {
      this.respondSubscription.unsubscribe();
      this.respondSubscription = null;
    }
  }


}
