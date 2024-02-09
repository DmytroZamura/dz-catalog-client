import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Activity, AggregatedFeedItem, Post, PostFeedFilter} from '../post';
import {AppFilterService} from '../../app-filter.service';
import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../category/category';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

import {GetStreamService} from '../../get-stream.service';
import {isPlatformBrowser} from '@angular/common';
import {UniversalFilter} from '../../common/universal-filter';
import {DeviceDetectorService} from 'ngx-device-detector';

import {SendPostRespondComponent} from '../respond/send-post-respond/send-post-respond.component';
import {GeneralService} from '../../general/general.service';
import {Currency} from '../../general/currency';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {SignalService} from '../../signal.service';
import {AppComponent} from '../../app.component';
import {CopyLinkComponent} from '../../common/copy-link/copy-link.component';
import {AppConfig} from '../../config/config.service';
import {LikesDialogComponent} from '../likes-dialog/likes-dialog.component';


@Component({
  selector: 'app-filtered-posts-list',
  templateUrl: './filtered-posts-list.component.html',
  styleUrls: ['./filtered-posts-list.component.css'],
  providers: [ConfirmationService]
})
export class FilteredPostsListComponent implements OnInit, OnDestroy {


  @Input() user: number;
  @Input() category: number;
  @Input() country: number;
  @Input() city: number;
  @Input() company: number;
  @Input() community: number;
  @Input() product: number;
  @Input() type: number;
  @Input() tag: string;
  @Input() published = true;
  @Input() search_word: string;
  @Input() editable: false;
  @Input() check_filter: false;
  @Input() show_posts = true;
  @Input() currencyCode: string;
  @Input() currentCurrency: number;
  @Input() relatedUser: number;
  @Input() relatedCompany: number;
  @Input() relatedProduct: number;
  @Input() appliedFilter = new UniversalFilter();
  @Input() itemsPerAdd = 10;
  @Input() showAdd = false;
  @Output() categorySelect = new EventEmitter<Category>();

  @ViewChild('respond') sendRespondComponent: SendPostRespondComponent;
  // @ViewChild('contentArea', {static: false}) private contentArea: ElementRef<HTMLMainElement>;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  @ViewChild('copyLink') copyLinkComponent: CopyLinkComponent;
  @ViewChild('likes') likesComponent: LikesDialogComponent;

  siteUrl = AppConfig.settings.redirectUri;

  private subscription: Subscription;
  private showPostsSubscription: Subscription;
  currentUserId = 0;

  posts: Post[];
  feedItems: AggregatedFeedItem[];
  loading = false;
  posts_page = 0;
  feed_page = 0;
  feedFinished = false;
  postsFinished = false;
  isBrowser = false;
  filter = '';
  showFeed = false;
  locale = 'en';


  isMobile = false;
  loadingTimeOut = false;
  firstLoading = true;
  truncateNumber = 55;
  currentCurrencyDetails: Currency;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  private postSubscription: Subscription;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
              @Inject(PLATFORM_ID) private platformId: Object,
              private service: GeneralService,
              public app: AppComponent,
              private confirmationService: ConfirmationService, private filterService: AppFilterService,
              private messageService: StandardMessageService, private translate: TranslateService, private signalService: SignalService,
              private stremService: GetStreamService, private deviceService: DeviceDetectorService, private generalService: GeneralService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    if (!this.currentCurrency) {
      const currentCurrency = +localStorage.getItem('currency');

      if (currentCurrency) {
        this.currentCurrency = currentCurrency;
      } else {
        this.currentCurrency = 1;
      }
    }
  }

  // TODO: Cross browsing
  static gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }


  ngOnInit() {
    this.getCurrentCurrencyDetails();
    if (this.isBrowser) {
      this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
        this.deleteConfirmationLabel = res;

      });

      this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
        this.deleteMessageLabel = res;

      });

      if (this.isMobile) {
        this.truncateNumber = 23;
      }
      this.currentUserId = +localStorage.getItem('user_id');
      this.locale = this.localStorage.getItem('language_code');


      this.subscription = this.filterService.filterApplied.subscribe(filter => {


        this.appliedFilter = filter;

        this.initNewFilter();

      });


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

            this.onPostCreated(post);
          }
        } else {
          this.onPostCreated(post);
        }

      });
    }
    let applyFilter = true;
    if (this.appliedFilter) {
      this.initNewFilter();
      applyFilter = false;
    }

    if (this.isBrowser) {

      if (!this.community && !this.user && !this.company && !this.search_word && !this.relatedProduct && !this.relatedUser
        && !this.relatedCompany) {

        this.filterService.initNavigation(1, null, 'feed', applyFilter, this.appliedFilter);
      } else {
        if (this.search_word) {
          this.filterService.initNavigation(91, null, 'feed', applyFilter, this.appliedFilter);
        } else {
          if (this.company) {
            this.filterService.initNavigation(61, this.company, 'feed', applyFilter, this.appliedFilter);
          }

          if (this.user) {
            this.filterService.initNavigation(71, this.user, 'feed', applyFilter, this.appliedFilter);
          }
          if (this.community) {
            this.filterService.initNavigation(81, this.community, 'feed', applyFilter, this.appliedFilter);
          }

          if (this.relatedCompany || this.relatedUser || this.relatedProduct) {
            this.filterService.initNavigation(21, null, 'feed', applyFilter, this.appliedFilter);
          }


        }
      }
    }


  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.showPostsSubscription) {
      this.showPostsSubscription.unsubscribe();
      this.showPostsSubscription = null;
    }

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
      this.postSubscription = null;
    }


  }


  isObjectPosts(): boolean {


    if (this.user || this.company || this.product || this.community || this.relatedProduct || this.relatedUser || this.relatedCompany
      || this.tag || this.search_word) {
      return true;
    } else {
      return false;
    }

  }

  onCopyLink(link: string) {
    this.copyLinkComponent.openDialog(link);
  }

  getCurrentCurrencyDetails() {

    this.generalService.getCurrency(this.currentCurrency)
      .then(res => {

        this.currentCurrencyDetails = res;
        this.currencyCode = this.currentCurrencyDetails.code;


      })
      .catch(error => {
        console.log(error);
      });


  }

  formFilter() {
    let showFeed = true;
    let filter_str = '?';
    if (this.user) {
      filter_str = filter_str + '&user=' + this.user;
      showFeed = false;
    }
    if (this.company) {
      filter_str = filter_str + '&company=' + this.company;
      showFeed = false;
    }
    if (this.community) {
      filter_str = filter_str + '&community=' + this.community;
      showFeed = false;
    }

    if (this.product) {
      filter_str = filter_str + '&product=' + this.product;
      showFeed = false;
    }

    if (this.relatedUser) {
      filter_str = filter_str + '&related_user=' + this.relatedUser;
      showFeed = false;
    }

    if (this.relatedCompany) {
      filter_str = filter_str + '&related_company=' + this.relatedCompany;
      showFeed = false;
    }

    if (this.relatedProduct) {
      filter_str = filter_str + '&related_product=' + this.relatedProduct;
      showFeed = false;
    }

    if (this.tag) {
      filter_str = filter_str + '&tag=' + this.tag;
      showFeed = false;
    }

    if (this.currentCurrency) {
      filter_str = filter_str + '&current_currency=' + this.currentCurrency;
    }

    if (this.search_word) {
      filter_str = filter_str + '&search_word=' + this.search_word;
      showFeed = false;
    }


    filter_str = filter_str + '&published=' + this.published;


    if (this.appliedFilter) {

      if (this.appliedFilter.category) {
        filter_str = filter_str + '&category=' + this.appliedFilter.category.id;
        showFeed = false;
      }

      if (this.appliedFilter.country) {
        filter_str = filter_str + '&country=' + this.appliedFilter.country.id;
        showFeed = false;
      }

      if (this.appliedFilter.region) {
        filter_str = filter_str + '&region=' + this.appliedFilter.region.id;
        showFeed = false;
      }
      if (this.appliedFilter.city) {
        filter_str = filter_str + '&city=' + this.appliedFilter.city.id;
        showFeed = false;
      }

      if (this.appliedFilter.post_type) {
        filter_str = filter_str + '&type=' + this.appliedFilter.post_type.id;
      }


      if (this.appliedFilter.job_type) {
        filter_str = filter_str + '&job_type=' + this.appliedFilter.job_type.id;
        showFeed = false;
      }

      if (this.appliedFilter.job_function) {
        filter_str = filter_str + '&job_function=' + this.appliedFilter.job_function.id;
        showFeed = false;
      }

      if (this.appliedFilter.seniority_label) {
        filter_str = filter_str + '&seniority_label=' + this.appliedFilter.seniority_label.id;
        showFeed = false;
      }

      if (this.appliedFilter.filterSet) {
        if (this.appliedFilter.filterSet.currency) {
          showFeed = false;
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
          // this.filterValues = null;
          showFeed = false;
        }
      }

      if (this.currentUserId) {
        filter_str = filter_str + '&currentuser=' + this.currentUserId + '&timestamp=' + this.app.appService.timestamp;
      }


    }

    this.filter = filter_str;
    this.showFeed = showFeed;

  }


  getPosts(): void {


    if (this.show_posts) {
      this.formFilter();
      if (!this.loadingTimeOut) {
        this.filterService.onLoadingStarted();
        this.loading = true;
      }

      if (this.firstLoading) {
        this.loadingTimeOut = true;
        setTimeout(() => {
          this.loadingTimeOut = false;
          this.firstLoading = false;

        }, 1000);
      }


      if (this.showFeed && this.currentUserId && !this.feedFinished) {

        const url = `${'user-feed/'}`;
        this.service.getItemsByPage(url, this.feed_page, this.filter)
          .then(items => {

            if (!this.feedItems) {
              this.feedItems = items;
            } else {

              this.feedItems = this.feedItems.concat(items);
            }

            if (items[4]) {
              // const loadEvent = new AggregatedFeedItem();
              // loadEvent.verb = 'load';
              // this.feedItems.push(loadEvent);

              this.filterService.onLoadingFinished();
              this.feed_page = this.feed_page + 1;
              this.loading = false;
            } else {
              // this.showFeed = true;
              this.feedFinished = true;
              this.getFilteredPosts();
            }


          })
          .catch(error => {

            this.feedFinished = true;
            this.getFilteredPosts();
          });

      } else {

        this.getFilteredPosts();
      }
    }

  }

  getFilteredPosts() {
    if (!this.postsFinished) {
      const url = `${'get-filtered-posts-by-page/'}`;


      this.service.getItemsByPage(url, this.posts_page, this.filter)
        .then(posts => {
          if (!this.posts) {
            this.posts = posts;
          } else {

            this.posts = this.posts.concat(posts);
          }


          if (posts[4]) {
            this.posts_page = this.posts_page + 1;
          } else {
            // this.showFeed = true;
            this.postsFinished = true;

          }

          this.filterService.onLoadingFinished();


          this.loading = false;


        })
        .catch(error => {
          this.handleError(error);
        });


    } else {
      this.loading = false;
    }
  }

  onCategorySelect(event) {
    if (this.category !== event) {
      this.category = event;
      this.initNewFilter();
    }
  }


  onTagChanged(event) {
    if (this.tag !== event) {
      this.tag = event;

      this.initNewFilter();
    }
  }

  onSearchChanged(event) {
    if (this.search_word !== event) {
      this.search_word = event;

      this.initNewFilter();
    }
  }

  onPostTypeSelect(event) {

    if (this.type !== event) {
      this.type = event;
      this.initNewFilter();
    }
  }


  initNewFilter() {


    this.posts = [];
    this.posts_page = 0;
    this.feedItems = [];
    if (this.isBrowser) {
      FilteredPostsListComponent.gotoTop();
    }

    this.showFeed = false;
    this.feedFinished = false;
    this.postsFinished = false;
    this.feed_page = 0;
    this.firstLoading = true;

    this.getPosts();
  }

  onPostFocus() {
    if (!this.postsFinished && !this.loading) {
      // this.loading = true;

      this.getPosts();
    }

  }

  onPostCreated(event) {

    if (this.feedItems) {
      const item = new AggregatedFeedItem();
      const activity = new Activity();
      activity.object = event;
      activity.verb = 'post';
      item.activities = [];
      item.activities.push(activity);
      item.verb = 'post';
      item.actor_count = 1;
      item.activity_count = 1;
      item.created_at = event.create_date;
      this.feedItems.splice(0, 0, item);
    } else {
      this.posts.splice(0, 0, event);
    }

  }


  deletePost(event): void {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {

        this.processDialogComponent.show();


        const url = `${'delete-post/'}`;

        this.service.deleteItemByPk(url, event.post.id)
          .then(() => {
            this.processDialogComponent.close();
            if (event.feed) {
              this.feedItems.splice(event.index, 1);
            } else {
              this.posts.splice(event.index, 1);
            }

            this.app.newTimestamp();
            this.signalService.deletePost(event.post);

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Post',
              detail: 'Successfully deleted'
            });


          })
          .catch(error => {
            this.handleError(error);
            this.processDialogComponent.close();
          });


      },
      reject: () => {
        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });


  }

  onSelectCategory(event: Category) {

    this.appliedFilter.category = event;
    this.filterService.changeFilter(this.appliedFilter);


  }

  onFilterSelected(filter: PostFeedFilter) {
    this.appliedFilter.post_type = filter.post_type_details;
    this.appliedFilter.country = filter.country_details;
    this.appliedFilter.city = filter.city_details;
    this.appliedFilter.category = filter.category_details;
    this.appliedFilter.seniority_label = filter.seniority_details;
    this.appliedFilter.job_type = filter.job_type_details;
    this.appliedFilter.job_function = filter.job_function_details;
    this.filterService.changeFilter(this.appliedFilter);

  }


  onResponded(event) {


    if (event.feedType === 2) {

      if (event.postType !== 'job') {
        this.posts[event.postIndex].responder_status = true;
      } else {
        this.posts[event.postIndex].applicant_status = true;
      }
      this.posts[event.postIndex].responder_status = true;

    }
    if (event.feedType === 1) {


      if (this.feedItems[event.postIndex].activities[0].verb === 'post') {
        if (event.postType !== 'job') {
          this.feedItems[event.postIndex].activities[0].object.responder_status = true;
        } else {
          this.feedItems[event.postIndex].activities[0].object.applicant_status = true;
        }
      } else {
        if (event.postType !== 'job') {
          this.feedItems[event.postIndex].activities[0].target.responder_status = true;
        } else {
          this.feedItems[event.postIndex].activities[0].target.applicant_status = true;
        }
      }


    }
  }


  onSendRespond(post: Post, index, feedType) {

    if (this.sendRespondComponent) {
      this.sendRespondComponent.showDialog(post, index, feedType);
    }
  }

  onShowLikes(params: any) {
    if (this.likesComponent) {
      this.likesComponent.onShowDialog(params);
    }
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
