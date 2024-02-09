import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {CommonItem} from '../common-item';
import {UniversalFilter} from '../../common/universal-filter';

import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {CopyLinkComponent} from '../../common/copy-link/copy-link.component';

import {Subscription} from 'rxjs';
import {GeneralService} from '../general.service';
import {AppFilterService} from '../../app-filter.service';
import {AppComponent} from '../../app.component';
import {StandardMessageService} from '../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {SignalService} from '../../signal.service';
import {DeviceDetectorService} from 'ngx-device-detector';

import {isPlatformBrowser} from '@angular/common';
import {Category} from '../../category/category';

import {ConfirmationService} from 'primeng/api';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-items-list-agile',
  templateUrl: './items-list-agile.component.html',
  styleUrls: ['./items-list-agile.component.css'],
  providers: [ConfirmationService]
})
export class ItemsListAgileComponent implements OnInit, OnDestroy {
  @Input() itemsType: string; // -- 'feed', 'people' , 'products', 'companies', 'communities' , 'responds', 'requests', obj.UserData
  @Input() postType: string;
  @Input() userType: string; // - owner, responder
  @Input() endPoint: string;
  @Input() deleteEndpoint: string;
  @Input() user: number;
  @Input() company: number;
  @Input() account: number;
  @Input() companyAdmin: number;
  @Input() communityAdmin: number;
  @Input() followCompany: number;
  @Input() followProfile: number;
  @Input() followingUser: number;
  @Input() community: number;
  @Input() product: number;
  @Input() post: number;
  @Input() comment: number;
  @Input() option: number;
  @Input() tag: string;
  @Input() keyword: string;
  @Input() canManage: false;
  @Input() currentUserId: number;
  @Input() itemsPerPage: number;
  @Input() itemsPerAdd = 10;
  @Input() orderingCode = '-create_date';
  @Input() loadAll = false;
  @Input() statusesEndPoint: string;
  @Input() typesEndPoint: string;
  @Input() published: boolean;
  @Input() relatedUser: number;
  @Input() relatedCompany: number;
  @Input() relatedProduct: number;
  @Input() statuses: CommonItem[];
  @Input() types: CommonItem[];
  @Input() truncateNumber = 65;

  @Input() locale = 'en';
  @Input() isMobile = false;
  @Input() userFilterBar = true;
  @Input() goToTopOnInitFilter = true;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() addUserToFilter = false;
  @Input() addTimestampToFilter = false;
  @Input() showAdd = false;
  @Input() adClient = 'ca-pub-4091968257038599';
  @Input() adSlot = 2347723942;
  @Input() adFormat = 'fluid';
  @Input() display = 'block';
  @Input() layoutKey = '-fb+5w+4e-db+86';
  @Input() initCurrency = false;

  @Input() appliedFilter = new UniversalFilter();


  @Output() itemDeletedEvent = new EventEmitter<any>();
  @Output() showLikes = new EventEmitter<any>();



  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  @ViewChild('copyLink') copyLinkComponent: CopyLinkComponent;
  @ContentChild('body', {static: false}) bodyTemplateRef: TemplateRef<any>;
  private subscription: Subscription;
  private postSubscription: Subscription;

  filter = '';
  showChat = false;

  isBrowser = false;

  loading = false;
  itemsFinished = false;


  items: any[];

  page = 0;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  currentCurrency: number;

  // currentCurrencyDetails: Currency;


  static gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }

  constructor(private generalService: GeneralService, @Inject(PLATFORM_ID) private platformId: Object,
              private filterService: AppFilterService, public app: AppComponent, @Inject(LOCAL_STORAGE) private localStorage: any,
              private messageService: StandardMessageService, private translate: TranslateService, private signalService: SignalService,
              private deviceService: DeviceDetectorService, private confirmationService: ConfirmationService) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    if (!this.isBrowser) {
      this.goToTopOnInitFilter = false;
    }
    this.isMobile = this.deviceService.isMobile();

    if (this.initCurrency) {
      const currentCurrency = +localStorage.getItem('currency');

      if (currentCurrency) {
        this.currentCurrency = currentCurrency;
      } else {
        this.currentCurrency = 1;
      }
    }


  }

  ngOnInit() {

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    if (!this.longitude || !this.latitude) {
      this.latitude = this.localStorage.getItem('latitude');
      this.longitude = this.localStorage.getItem('longitude');
    }



    if (this.statusesEndPoint) {
      this.getStatuses();
    }
    if (this.userFilterBar) {


      this.subscription = this.filterService.filterApplied.subscribe(filter => {


        this.applyFilter(filter);


      });
      if (this.appliedFilter) {
        this.initNewFilter();

      }

    } else {
      this.initNewFilter();
    }


    if (this.isBrowser) {


      this.initNavigation();


      if (this.itemsType === 'feed') {
        this.postSubscription = this.signalService.newPost.subscribe(post => {


          if (this.isObjectPosts()) {

            let addPost = false;

            if (this.user === post.user && !post.company) {
              addPost = true;
            }

            if (this.company === post.company) {
              addPost = true;
            }

            if (this.product === post.product) {
              addPost = true;
            }

            if (this.community === post.community) {
              addPost = true;
            }

            if (this.relatedCompany === post.related_company) {
              addPost = true;
            }

            if (this.relatedUser === post.related_user) {
              addPost = true;
            }

            if (this.relatedProduct === post.related_product) {
              addPost = true;
            }

            if (addPost) {

              this.onCreated(post);
            }
          } else {
            this.onCreated(post);
          }

        });
      }

    }


  }



  isObjectPosts(): boolean {


    if (this.user || this.company || this.product || this.community || this.relatedProduct || this.relatedUser || this.relatedCompany
      || this.tag || this.keyword) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter(filter: UniversalFilter) {
    this.appliedFilter = filter;
    this.initNewFilter();
  }


  initNavigation() {


    let applyFilter = true;
    if (this.appliedFilter) {

      applyFilter = false;
    }

    if (this.itemsType === 'communities') {
      this.filterService.initNavigation(4, null, this.itemsType, applyFilter, this.appliedFilter);
    }


    if (this.itemsType === 'favorite-posts') {
      this.filterService.initNavigation(1, null, this.itemsType, applyFilter, this.appliedFilter);
    }

    if (this.itemsType === 'people') {
      if (!this.keyword) {
        this.filterService.initNavigation(5, null, this.itemsType, applyFilter, this.appliedFilter);
      } else {
        this.filterService.initNavigation(95, null, this.itemsType, applyFilter, this.appliedFilter);
      }
    }

    if (this.itemsType === 'feed') {

      if (!this.community && !this.user && !this.company && !this.keyword && !this.relatedProduct && !this.relatedUser
        && !this.relatedCompany) {
        this.filterService.initNavigation(1, null, this.itemsType, applyFilter, this.appliedFilter);
      } else {
        if (this.keyword) {
          this.filterService.initNavigation(91, null, this.itemsType, applyFilter, this.appliedFilter);
        } else {
          if (this.company) {
            this.filterService.initNavigation(61, this.company, this.itemsType, applyFilter, this.appliedFilter);
          }

          if (this.user) {
            this.filterService.initNavigation(71, this.user, this.itemsType, applyFilter, this.appliedFilter);
          }
          if (this.community) {
            this.filterService.initNavigation(81, this.community, this.itemsType, applyFilter, this.appliedFilter);
          }

          if (this.relatedCompany || this.relatedUser || this.relatedProduct) {
            this.filterService.initNavigation(21, null, this.itemsType, applyFilter, this.appliedFilter);
          }

        }

      }
    }


    if (this.itemsType === 'products') {
      if (!this.community && !this.user && !this.company && !this.keyword) {
        this.filterService.initNavigation(3, null, this.itemsType, applyFilter, this.appliedFilter);

      } else {

        if (this.keyword) {
          this.filterService.initNavigation(93, null, this.itemsType, applyFilter, this.appliedFilter);
        } else {

          if (this.company) {
            if (!this.canManage) {
              this.filterService.initNavigation(62, this.company, this.itemsType, applyFilter, this.appliedFilter);
            } else {
              this.filterService.initNavigation(621, this.company, this.itemsType, applyFilter, this.appliedFilter);
            }
          }

          if (this.user) {
            if (!this.canManage) {
              this.filterService.initNavigation(72, this.user, this.itemsType, applyFilter, this.appliedFilter);
            } else {
              this.filterService.initNavigation(721, this.user, this.itemsType, applyFilter, this.appliedFilter);
            }
          }

          if (this.community) {
            this.filterService.initNavigation(82, this.community, this.itemsType, applyFilter, this.appliedFilter);

          }
        }
      }
    }


    if (this.itemsType === 'companies') {
      this.filterService.initNavigation(2, null, this.itemsType, applyFilter, this.appliedFilter);
    }

    if (this.itemsType === 'favorite-companies') {
      this.filterService.initNavigation(2, null, this.itemsType, applyFilter, this.appliedFilter);
    }


    if (this.itemsType === 'favorite-products') {
      this.filterService.initNavigation(3, null, this.itemsType, applyFilter, this.appliedFilter);
    }


    if (this.itemsType === 'favorite-tags' || this.itemsType === 'tags' || this.itemsType === 'payments' || this.itemsType === 'payment-order') {
      this.filterService.initNavigation(0, null, this.itemsType, applyFilter, this.appliedFilter);
    }


  }

  onCopyLink(link: string) {
    this.copyLinkComponent.openDialog(link);
  }

  changeMainFilter(companyId: number, postType: string, userType: string) {
    this.company = companyId;
    this.postType = postType;
    this.userType = userType;
    this.initNavigation();
  }

  initNewFilter() {

    if (this.goToTopOnInitFilter && this.isBrowser) {
      ItemsListAgileComponent.gotoTop();
    }
    this.items = [];
    this.page = 0;


    this.itemsFinished = false;


    this.getItems();
  }

  changeOrdering(code: string) {

    this.orderingCode = code;
    this.initNewFilter();
  }

  setKeyword(keyword: string) {
    this.keyword = keyword;
    this.initNewFilter();
  }

  setTag(slug: string) {
    this.tag = slug;
    this.initNewFilter();
  }


  formFilter() {

    let filter_str = '?';


    if (this.orderingCode) {
      filter_str = filter_str + '&ordering=' + this.orderingCode;
      if (this.orderingCode === 'close') {
        if (this.latitude) {
          filter_str = filter_str + '&latitude=' + this.latitude;
        }

        if (this.longitude) {
          filter_str = filter_str + '&longitude=' + this.longitude;
        }
      }
    }

    if (this.user) {
      filter_str = filter_str + '&user=' + this.user;
    }

    if (this.post) {
      filter_str = filter_str + '&post=' + this.post;
    }

    if (this.option) {
      filter_str = filter_str + '&option=' + this.option;
    }


    if (this.comment) {
      filter_str = filter_str + '&comment=' + this.comment;
    }

    if (this.currentCurrency) {
      filter_str = filter_str + '&current_currency=' + this.currentCurrency;
    }

    if (this.company) {
      filter_str = filter_str + '&company=' + this.company;
    }

    if (this.followProfile) {
      filter_str = filter_str + '&follow_profile=' + this.followProfile;
    }

    if (this.followingUser) {
      filter_str = filter_str + '&following_user=' + this.followingUser;
    }
    if (this.followCompany) {
      filter_str = filter_str + '&follow_company=' + this.followCompany;
    }

    if (this.community) {
      filter_str = filter_str + '&community=' + this.community;
    }

    if (this.product) {
      filter_str = filter_str + '&product=' + this.product;
    }

    if (this.account) {
      filter_str = filter_str + '&account=' + this.account;
    }

    if (this.companyAdmin) {
      filter_str = filter_str + '&company_admin=' + this.companyAdmin;
    }
    if (this.communityAdmin) {
      filter_str = filter_str + '&community_admin=' + this.communityAdmin;
    }

    if (this.relatedUser) {
      filter_str = filter_str + '&related_user=' + this.relatedUser;

    }

    if (this.relatedCompany) {
      filter_str = filter_str + '&related_company=' + this.relatedCompany;

    }

    if (this.relatedProduct) {
      filter_str = filter_str + '&related_product=' + this.relatedProduct;

    }

    if (this.tag) {
      filter_str = filter_str + '&tag=' + this.tag;
    }


    if (this.published != null) {
      filter_str = filter_str + '&published=' + Number(this.published);
    }


    // TODO Delete search_word
    //  if (this.keyword) {
    //   filter_str = filter_str + '&search_word=' + this.keyword;
    // }

    if (this.keyword) {
      filter_str = filter_str + '&keyword=' + this.keyword;
    }


    if (this.appliedFilter) {

      if (this.appliedFilter.category) {
        filter_str = filter_str + '&category=' + this.appliedFilter.category.id;
      }

      if (this.appliedFilter.country) {
        filter_str = filter_str + '&country=' + this.appliedFilter.country.id;

      }
      if (this.appliedFilter.region) {
        filter_str = filter_str + '&region=' + this.appliedFilter.region.id;

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


      if (this.appliedFilter.post_type) {
        filter_str = filter_str + '&type=' + this.appliedFilter.post_type.id;
      }

      if (this.appliedFilter.company_type) {
        filter_str = filter_str + '&company_type=' + this.appliedFilter.company_type.id;
      }
      if (this.appliedFilter.company_size) {
        filter_str = filter_str + '&company_size=' + this.appliedFilter.company_size.id;
      }
      if (this.appliedFilter.company_industry) {
        filter_str = filter_str + '&company_industry=' + this.appliedFilter.company_industry.id;
      }

      if (this.appliedFilter.product_group) {
        filter_str = filter_str + '&product_group=' + this.appliedFilter.product_group.id;
      }


      if (this.appliedFilter.filterSet) {
        if (this.appliedFilter.filterSet.currency) {

          filter_str = filter_str + '&currency=' + this.appliedFilter.filterSet.currency;
          if (this.appliedFilter.filterSet.price_from) {
            filter_str = filter_str + '&pricefrom=' + this.appliedFilter.filterSet.price_from;
          }
          if (this.appliedFilter.filterSet.price_to) {
            filter_str = filter_str + '&priceto=' + this.appliedFilter.filterSet.price_to;
          }
        }

        if (this.appliedFilter.filterSet.filterValues) {
          const filterDB = AppFilterService.getFilterDBValues(this.appliedFilter.filterSet.filterValues);
          filter_str = filter_str + '&attributes=' + JSON.stringify(filterDB);

        }
      }


    }


    if (this.currentUserId && this.addUserToFilter) {
      filter_str = filter_str + '&currentuser=' + this.currentUserId;
    }
    if (this.currentUserId && this.addTimestampToFilter) {
      filter_str = filter_str + '&timestamp=' + this.app.appService.timestamp;
    }

    this.filter = filter_str;


  }


  getItems() {
    if (!this.itemsFinished) {
      this.formFilter();
      console.log(this.filter);
      this.loading = true;
      if (this.userFilterBar) {
        this.filterService.onLoadingStarted();
      }

      if (!this.loadAll) {
        this.generalService.getItemsByPage(this.endPoint, this.page, this.filter)
          .then(res => {

            this.addItems(res);
            this.filterService.onLoadingFinished();

          })
          .catch(error => {

            console.log(error);
            this.filterService.onLoadingFinished();
          });
      } else {
        this.generalService.getItems(this.endPoint, this.filter)
          .then(res => {


            this.addItems(res);
            this.filterService.onLoadingFinished();

          })
          .catch(error => {

            console.log(error);
            this.filterService.onLoadingFinished();
          });

      }
    }
  }

  onItemDeletedEvent(index: number) {
    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {


        this.itemDeletedEvent.emit({index: index, value: this.items[index]});

      },
      reject: () => {
        this.messageService.addMessage({
          severity: 'info',
          summary: 'Rejected',
          detail: ''
        }, false);


      }
    });

  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  addItems(items: any[]) {


    if (!this.items) {
      this.items = items;
    } else {

      this.items = this.items.concat(items);
    }

    if (items[this.itemsPerPage - 1] && !this.loadAll) {


      this.page = this.page + 1;
    } else {
      this.itemsFinished = true;

    }


    this.loading = false;
  }


  getStatuses() {

    this.generalService.getCommonItems(this.statusesEndPoint)
      .then(res => {


        this.statuses = res;


      })
      .catch(error => {
        console.log(error);
      });
  }

  getTypes() {

    this.generalService.getCommonItems(this.typesEndPoint)
      .then(res => {


        this.types = res;


      })
      .catch(error => {
        console.log(error);
      });
  }


  onItemFocus() {
    if (!this.itemsFinished && !this.loading) {
      this.getItems();
    }

  }

  onDeleted(event) {

    let index: number;
    let pk: number;
    if (this.itemsType === 'favorite-posts' || this.itemsType === 'feed') {
      index = event.index;
      this.app.newTimestamp();
    } else {
      index = event;

    }


    if (this.itemsType === 'favorite-posts') {
      pk = this.items[index].post;
    } else {

      pk = this.items[index].id;
    }


    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {

        this.processDialogComponent.show();


        this.generalService.deleteItemByPk(this.deleteEndpoint, pk)
          .then(() => {
            this.processDialogComponent.close();
            this.items.splice(index, 1);

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Record',
              detail: 'Successfully deleted'
            });


          })
          .catch(error => {
            this.handleError(error);
            this.processDialogComponent.close();
          });


      },
      reject: () => {
        this.messageService.addMessage({
          severity: 'info',
          summary: 'Rejected',
          detail: ''
        }, false);
      }
    });


  }

  onCreated(event) {
    this.items.splice(0, 0, event);

  }

  onResponded(event) {


    if (event.feedType === 2) {

      if (this.itemsType === 'feed') {
        if (event.postType !== 'job') {
          this.items[event.postIndex].responder_status = true;
        } else {
          this.items[event.postIndex].applicant_status = true;
        }
        this.items[event.postIndex].responder_status = true;
      } else {

        if (event.postType !== 'job') {

          this.items[event.postIndex].post_details.responder_status = true;
        } else {
          this.items[event.postIndex].post_details.applicant_status = true;
        }
        this.items[event.postIndex].post_details.responder_status = true;
      }
    }

  }

  onSelectCategory(event: Category) {

    this.appliedFilter.category = event;
    this.filterService.changeFilter(this.appliedFilter);


  }




  onShowLikes(params: any) {
    this.showLikes.emit(params);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
      this.postSubscription = null;
    }
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
