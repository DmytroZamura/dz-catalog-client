import {Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';

import {Subscription} from 'rxjs';
import {AppFilterService} from '../../app-filter.service';
import {FeedFilter, UniversalFilter} from '../universal-filter';
import {Category} from '../../category/category';
import {CategoriesNavigatorComponent} from '../../category/categories-navigator/categories-navigator.component';
import {CommonItem} from '../../general/common-item';
import {SelectCategoryDialogComponent} from '../../category/select-category-dialog/select-category-dialog.component';
import {isPlatformBrowser} from '@angular/common';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-filter-navigator',
  templateUrl: './filter-navigator.component.html',
  styleUrls: ['./filter-navigator.component.css']
})
export class FilterNavigatorComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() filterType = 'feed';
  @Input() showCategories = true;
  @Input() showFilter = true;
  @Input() objectRelatedTypesFilter: string;
  @Input() postTypes: CommonItem[];
  @Input() showChildCategories = false;
  @Input() childCategoriesCarouselView = false;
  @Input() childCategoriesProductView = false;
  @Input() followFilter = false;
  @Input() currentUserId = 0;
  @Input() filter = new UniversalFilter();
  contentTypeFilter = '?products_exist=True';
  @ViewChild('navigator') navigatorComponent: CategoriesNavigatorComponent;
  @ViewChild('categorydialog') categoryDialogComponent: SelectCategoryDialogComponent;
  isBrowser = false;
  postTypesFilter = '';
  loading = true;
  feedFilter: FeedFilter;
  private subscription: Subscription;
  private loadingSubscription: Subscription;
  private loadingFinishedSubscription: Subscription;
  firstLoading = true;

  constructor(private filterService: AppFilterService, private service: GeneralService, @Inject(PLATFORM_ID) private platformId: Object,
              public app: AppComponent) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.filterType === 'feed' || this.filterType === 'favorite-posts') {
      this.contentTypeFilter = '?posts_exist=True';
    }

    if (this.filterType === 'companies' || this.filterType === 'favorite-companies') {
      this.contentTypeFilter = '?companies_exist=True';
    }

    if (this.filterType === 'products' || this.filterType === 'favorite-products') {
      this.contentTypeFilter = '?products_exist=True';
    }

    if (this.filterType === 'communities' || this.filterType === 'favorite-communities') {
      this.contentTypeFilter = '?communities_exist=True';
    }

    if (this.filterType === 'people') {
      this.contentTypeFilter = '?users_exist=True';
    }


    if (this.showFilter) {
      if (this.objectRelatedTypesFilter) {
        this.postTypesFilter = '?object_related=' + this.objectRelatedTypesFilter;
      }

      this.loadingSubscription = this.filterService.filterLoadingStarted.subscribe(loading => {


        this.loading = true;


        //
        // if (this.firstLoading) {
        //   this.firstLoading = false;
        // }
        // {
        //   this.loading = true;
        // }


      });

      this.loadingFinishedSubscription = this.filterService.filterLoadingFinished.subscribe(loading => {


        this.loading = false;


      });

      this.subscription = this.filterService.filterApplied.subscribe(filter => {


        this.applyFilter(filter);


      });
    }
    if (this.filter && !this.isBrowser) {
      this.applyFilter(this.filter);
    }

    if (this.isBrowser && this.filter) {
      this.getFeedFilter();
    }


  }

  ngAfterViewInit(): void {


    if (this.showCategories && this.showFilter) {
      this.filterCategory();
    }
  }

  getFeedFilter() {
    if (this.filter && this.followFilter && this.currentUserId) {

      const query = AppFilterService.formFilterQueryParams(this.filter);

      const url = `${'get-feed-filter/'}${JSON.stringify(query)}${'/'}`;
      this.service.getItem(url)
        .then(res => {
          this.feedFilter = res;


        })
        .catch(error => {
          console.log(error);
        });


    } else {
      this.feedFilter = null;
    }
  }

  followFeed() {
    this.loading = true;
    const url = `${'follow-filter'}`;

    this.service.createItem(url, this.feedFilter)
      .then(res => {
        this.feedFilter = res;

        this.loading = false;
        this.app.newTimestamp();

      })
      .catch(error => {
        console.log(error);
      });


  }

  unfollowFeed() {
    this.loading = true;
    const url = `${'unfollow-filter/'}`;
    this.service.deleteItemByPk(url, this.feedFilter.filter_id)
      .then(res => {
        this.feedFilter.following_status = false;
        this.loading = false;
        this.app.newTimestamp();

      })
      .catch(error => {
        console.log(error);
      });


  }

  applyFilter(filter: UniversalFilter) {
    this.filter = filter;
    this.getFeedFilter();

    if (this.showCategories) {
      this.filterCategory();
    }
  }

  filterCategory() {

    if (this.filter) {
      if (this.navigatorComponent) {
        if (this.filter.category) {
          this.navigatorComponent.onCategoryChanged(this.filter.category.id);
        } else {

          this.navigatorComponent.onCategoryChanged(null);

        }
      }
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.loadingFinishedSubscription) {
      this.loadingFinishedSubscription.unsubscribe();
      this.loadingFinishedSubscription = null;
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
      this.loadingSubscription = null;
    }
  }

  deleteCategory() {

    if (this.filter && !this.loading) {
      this.filter.category = new Category();
      this.filterService.changeFilter(this.filter);
    }
  }

  onCategorySelected(event) {
    if (this.filter && !this.loading) {

      if (!event.id) {
        this.filter.category = null;
      } else {
        this.filter.category = event;
      }
      // this.navigatorComponent.onCategoryChanged(event.id);
      this.filterService.changeFilter(this.filter);
    }
  }


  deleteCountry() {

    if (this.filter && !this.loading) {
      this.filter.country = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteRegion() {

    if (this.filter && !this.loading) {
      this.filter.region = null;
      this.filterService.changeFilter(this.filter);
    }
  }


  deleteJobFunction() {
    if (this.filter && !this.loading) {
      this.filter.job_function = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteJobType() {
    if (this.filter && !this.loading) {
      this.filter.job_type = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteSeniorityLabel() {
    if (this.filter && !this.loading) {
      this.filter.seniority_label = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteApplicantStatus() {
    if (this.filter && !this.loading) {
      this.filter.applicantStatus = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteRespondStatus() {
    if (this.filter && !this.loading) {
      this.filter.respondStatus = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteRequestStatus() {
    if (this.filter && !this.loading) {
      this.filter.requestStatus = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteCity() {

    if (this.filter && !this.loading) {
      this.filter.city = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  updatePostType(postType: CommonItem) {
    if (this.filter && !this.loading) {
      this.filter.post_type = postType;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteCompanyType() {
    if (this.filter && !this.loading) {
      this.filter.company_type = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteCompanyIndustry() {
    if (this.filter && !this.loading) {
      this.filter.company_industry = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  deleteCompanySize() {
    if (this.filter && !this.loading) {
      this.filter.company_size = null;
      this.filterService.changeFilter(this.filter);
    }
  }

  clearAtributes() {
    if (this.filter && !this.loading) {
      this.filter.clearAtributes = true;

      this.filterService.changeFilter(this.filter);
    }
  }

  clearSalary() {
    if (!this.loading) {
      this.filter.salary_to = null;
      this.filter.salary_from = null;
      this.filterService.changeFilter(this.filter);
    }
  }


  onShowCategoryDialog() {
    if (!this.loading) {

      this.categoryDialogComponent.showCategoryDialog(this.filter.category);

    }
  }


}
