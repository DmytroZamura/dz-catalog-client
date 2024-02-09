import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../category/category';

import {CategoriesTreeComponent} from '../categories-tree/categories-tree.component';
import {ProfileShort} from '../../profile/profile';
import {MenuItem, Message} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {UniversalFilter} from '../../common/universal-filter';
import {Product, ProductGroup} from '../../product/product';
import {isPlatformBrowser} from '@angular/common';
import {FilterAttributesComponent} from '../../attribute/filter-attributes/filter-attributes.component';
import {Country, Region} from '../../general/country';
import {City} from '../../general/city';
import {CompanyIndustry, CompanySize, CompanyType} from '../../company/company';
import {Router} from '@angular/router';
import {CommonItem} from '../../general/common-item';
import {GeneralService} from '../../general/general.service';
import {Currency} from '../../general/currency';
import {SelectCommonItemComponent} from '../../general/select-common-item/select-common-item.component';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AppFilterService} from '../../app-filter.service';
import {AppService} from '../../app.service';


@Component({
  selector: 'app-navigation-widget',
  templateUrl: './navigation-widget.component.html',
  styleUrls: ['./navigation-widget.component.css']
})
export class NavigationWidgetComponent implements OnInit, OnDestroy {
  @Input() user: number;
  @Input() navigationObject: number; // 0 - settings, 1 - Feed, 2 - Companies, 3 - Products, 4 - Communities, 5 - People, 6- Company, 61 - Company posts, 62 - Company products, 7 - UserProfile, 71 - Profile posts, 72 - Profile products,
  @Output() categorySelect = new EventEmitter<Category>();
  @Output() filterApplied: EventEmitter<UniversalFilter> = new EventEmitter();
  @Output() newNavigationObject: EventEmitter<number> = new EventEmitter();
  @ViewChild('categoruestree') treeComponent: CategoriesTreeComponent;
  @ViewChild('filterwidget') filterAtrrributesComponent: FilterAttributesComponent;
  @ViewChild('selectCountry') countriesComponent: SelectCommonItemComponent;
  @ViewChild('selectRegion') regionsComponent: SelectCommonItemComponent;
  @ViewChild('selectcity') citiesComponent: SelectCommonItemComponent;

  private loadingSubscription: Subscription;
  private loadingFinishedSubscription: Subscription;
  private subscription: Subscription;
  private filterSubscription: Subscription;


  currentCurrencyDetails: Currency;
  isBrowser = false;
  selectedCategory = new Category();
  profile: ProfileShort;
  companyId: number;
  profileUserId: number;
  isProductsList = false;
  selectedGroup = new ProductGroup();
  new_product = false;
  selectedCountry: Country;
  selectedRegion: Region;
  selectedCity: City;
  locationFilter: string;
  postType: CommonItem;
  companySize: CompanySize;
  companyIndustry: CompanyIndustry;
  companyType: CompanyType;
  jobType: CommonItem;
  jobFunction: CommonItem;
  seniorityLabel: CommonItem;
  applicantStatus: CommonItem;
  respondStatus: CommonItem;
  requestStatus: CommonItem;
  items: MenuItem[];
  activeTab = 0;
  filterValue = new UniversalFilter();
  emitFilter = true;
  msgs: Message[];
  itemsType: string;
  contentTypeFilter = '?products_exist=True';
  loading = false;


  filterLoactionsNavigationTypes = [1, 2, 3, 4, 5, 21, 6, 61, 71, 81, 82, 83, 91, 92, 93, 95, 10, 11, 12];

  constructor(public appService: AppService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private generalService: GeneralService, private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router, private filterService: AppFilterService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {

    // this.initNavigation(this.user);
    this.selectedCategory.id = 0;
    //

    if (this.isBrowser) {
      if (!this.filterValue.currency) {
        const currentCurrency = +localStorage.getItem('currency');


        if (currentCurrency) {
          this.filterValue.currency = currentCurrency;
        } else {
          this.filterValue.currency = 1;
        }
        this.getCurrentCurrencyDetails();
      }


      this.loadingSubscription = this.filterService.filterLoadingStarted.subscribe(loading => {

        this.loading = true;


      });

      this.loadingFinishedSubscription = this.filterService.filterLoadingFinished.subscribe(loading => {

        this.loading = false;


      });


      if (this.filterService.filterInitialized) {
        this.initNavigation(this.user, this.filterService.currentNavigationObject,
          this.filterService.currentObject,
          this.filterService.currentItemsType, this.filterService.appliedFilter, this.filterService.currentFilter);

      }


      this.subscription = this.filterService.initNavigationWidget.subscribe(res => {

        if (this.isBrowser) {
          const currentUser = +localStorage.getItem('user_id');
          if (this.user !== currentUser) {
            this.user = currentUser;

          }
        }


        this.initNavigation(this.user, res.navigationObject, res.object, res.itemsType, res.applyFilter, res.filter);

      });


      this.filterSubscription = this.filterService.filterChanged.subscribe(filter => {

        this.changeFilter(filter);


      });

      if (this.filterService.currentFilter) {
        this.changeFilter(this.filterService.currentFilter, false);
      }

    }

  }

  setContentTypeFilter() {
    if (this.itemsType === 'feed' || this.itemsType === 'favorite-posts') {
      this.contentTypeFilter = '?posts_exist=True';
    }

    if (this.itemsType === 'companies' || this.itemsType === 'favorite-companies') {
      this.contentTypeFilter = '?companies_exist=True';
    }

    if (this.itemsType === 'products' || this.itemsType === 'favorite-products') {
      this.contentTypeFilter = '?products_exist=True';
    }

    if (this.itemsType === 'communities' || this.itemsType === 'favorite-communities') {
      this.contentTypeFilter = '?communities_exist=True';
    }

    if (this.itemsType === 'people') {
      this.contentTypeFilter = '?users_exist=True';
    }
  }

  clearFilter() {
    this.filterValue = new UniversalFilter();
    this.selectedCategory = new Category();
    this.refreshCategories(this.selectedCategory);


    this.selectedGroup = new ProductGroup();

    this.selectedCountry = null;
    this.selectedRegion = null;
    this.selectedCity = null;
    this.postType = null;
    this.companySize = null;
    this.companyIndustry = null;
    this.companyType = null;
    this.jobType = null;
    this.jobFunction = null;
    this.seniorityLabel = null;
    this.applicantStatus = null;
    this.respondStatus = null;
    this.requestStatus = null;
  }


  getCurrentCurrencyDetails() {

    this.generalService.getCurrency(this.filterValue.currency)
      .then(res => {

        this.currentCurrencyDetails = res;


      })
      .catch(error => {
        console.log(error);
      });


  }

  changeFilter(filter: UniversalFilter, applyFilter = true) {
    this.emitFilter = false;
    this.filterValue = filter;


    if (filter.category !== this.selectedCategory) {
      this.onCategorySelected(filter.category);
    }

    this.onPostTypeChange(filter.post_type);

    if (filter.city !== this.selectedCity) {

      this.onCitySelected(filter.city);
    }

    if (filter.region !== this.selectedRegion) {

      this.onRegionSelected(filter.region);
    }

    if (filter.country !== this.selectedCountry) {
      this.onCountrySelected(filter.country);

    }


    if (filter.product_group !== this.selectedGroup) {
      this.selectedGroup = filter.product_group;
    }

    if (filter.clearAtributes) {
      this.filterAtrrributesComponent.onClearFilter();
      filter.clearAtributes = false;
    }


    this.companyIndustry = filter.company_industry;
    this.companyType = filter.company_type;
    this.companySize = filter.company_size;
    this.jobType = filter.job_type;
    this.jobFunction = filter.job_function;
    this.seniorityLabel = filter.seniority_label;
    this.filterValue.salary_from = filter.salary_from;
    this.filterValue.salary_to = filter.salary_to;
    this.requestStatus = filter.requestStatus;
    this.respondStatus = filter.respondStatus;
    this.applicantStatus = filter.applicantStatus;


    this.emitFilter = true;
    if (applyFilter) {
      this.applyFilter();
    }
  }


  initNavigation(user: number, navigationObject: number, object: number, itemsType: string, appplyFilter = true, filter: UniversalFilter) {
    if (this.itemsType !== itemsType) {
      this.itemsType = itemsType;
      this.setContentTypeFilter();
      this.refreshCategories(this.selectedCategory);

    }

    if (this.navigationObject !== navigationObject) {
      this.navigationObject = navigationObject;
      this.newNavigationObject.emit(this.navigationObject);
      if (this.user !== user) {
        this.user = user;

        if (this.user) {
          this.getShortUserProfile();
        }


        this.items = [];
        this.translate.get('CATEGORY.Catalog').subscribe(res => {
          this.items.push({
            label: res,
            command: (event: any) => {
              this.activeTab = 0;

            }
          });

        });
        if (this.user) {
          this.translate.get('CATEGORY.Interests').subscribe(res => {
            this.items.push({
              label: res,
              command: (event: any) => {
                this.activeTab = 1;

              }
            });

          });
        }


      }


      if (navigationObject === 21) {
        if (this.postType) {
          if (this.postType.code !== 'review' && this.postType.code !== 'question') {
            this.emitFilter = false;
            this.onPostTypeChange(null);
            this.emitFilter = true;
          }
        }
      }

      if ((navigationObject === 62 || navigationObject === 621) && this.companyId !== object) {
        this.companyId = object;
        this.profileUserId = null;
      }

      if ((navigationObject === 72 || navigationObject === 721) && this.profileUserId !== object) {
        this.profileUserId = object;
        this.companyId = null;
      }


      this.navigationObject = navigationObject;
      this.clearFilter();


      if (navigationObject === 3 || navigationObject === 82) {

        this.isProductsList = true;
        if (this.filterAtrrributesComponent) {
          this.filterAtrrributesComponent.onProductsListSelected();
          this.filterAtrrributesComponent.showFilter(this.selectedCategory.id);
        }
      } else {
        if (this.filterAtrrributesComponent) {
          this.filterAtrrributesComponent.onPostTypeChange(this.postType);
          this.filterAtrrributesComponent.showFilter(this.selectedCategory.id);
        }
      }


      this.filterValue.product_group = null;
      this.filterValue.filterSet = null;
    }
    if (filter) {
      this.changeFilter(filter, false);
    }

    if (appplyFilter) {
      this.applyFilter();
    }

  }


  getShortUserProfile(): void {
    const url = `${'get-short-user-profile/'}${this.user}`;
    this.generalService.getItem(url)
      .then(res => {

        this.profile = res;


      })
      .catch(error => {
        console.log(error);
      });


  }

  onCategorySelected(category: Category) {

    if (!category) {
      category = new Category();
    }

    this.refreshCategories(category);

    if (this.filterAtrrributesComponent) {
      this.filterAtrrributesComponent.showFilter(category.id);
    }

    if (category.id) {
      this.filterValue.category = category;
    } else {
      this.filterValue.category = null;
    }
    this.filterValue.filterSet = null;
    this.applyFilter();
    // this.categorySelect.emit(category);

  }

  refreshCategories(category: Category, init = false) {

    this.selectedCategory = category;
    if (this.activeTab === 0) {
      if (this.treeComponent) {

        this.treeComponent.refreshCategories(category.id, this.contentTypeFilter, init);
      }
    }

  }

  onPostTypeChange(event) {
    if (this.postType !== event) {

      this.postType = event;
      if (this.filterAtrrributesComponent) {
        this.filterAtrrributesComponent.onPostTypeChange(event);
      }

      if (event) {
        this.filterValue.post_type = event;
        if (this.postType.code !== 'job') {
          this.clearJobFilters();
        }
      } else {
        this.filterValue.post_type = null;
        this.clearJobFilters();
      }

      this.filterValue.filterSet = null;
      this.applyFilter();
    }
  }

  clearJobFilters() {
    this.seniorityLabel = null;
    this.filterValue.seniority_label = null;
    this.jobFunction = null;
    this.filterValue.job_function = null;
    this.jobType = null;
    this.filterValue.job_type = null;
  }

  onCompanyTypeSelect(event) {
    this.companyType = event;
    if (event) {
      this.filterValue.company_type = event;
    } else {
      this.filterValue.company_type = null;
    }
    this.applyFilter();
  }

  onCompanyIndustrySelect(event) {
    this.companyIndustry = event;
    if (event) {
      this.filterValue.company_industry = event;
    } else {
      this.filterValue.company_industry = null;
    }
    this.applyFilter();
  }

  onCompanySizeSelect(event) {
    this.companySize = event;
    if (event) {
      this.filterValue.company_size = event;
    } else {
      this.filterValue.company_size = null;
    }
    this.applyFilter();
  }


  onGroupSelected(event) {
    this.selectedGroup = event;
    if (event.id) {
      this.filterValue.product_group = event;
    } else {
      this.filterValue.product_group = null;
    }

    this.applyFilter();
  }


  jobTypeSelected(event) {
    this.jobType = event;
    if (event) {
      this.filterValue.job_type = event;

    } else {
      this.filterValue.job_type = null;

    }

    this.applyFilter();
  }

  jobFunctionSelected(event) {
    this.jobFunction = event;
    if (event) {
      this.filterValue.job_function = event;

    } else {
      this.filterValue.job_function = null;

    }
    this.applyFilter();
  }

  seniorityLevelSelected(event) {
    this.seniorityLabel = event;
    if (event) {
      this.filterValue.seniority_label = event;

    } else {
      this.filterValue.seniority_label = null;

    }
    this.applyFilter();
  }

  onApplicantStatusSelected(event) {

    this.applicantStatus = event;
    if (event) {
      this.filterValue.applicantStatus = event;

    } else {
      this.filterValue.applicantStatus = null;

    }
    this.applyFilter();

  }

  onPostRespondStatusSelected(event) {
    this.respondStatus = event;
    if (event) {
      this.filterValue.respondStatus = event;

    } else {
      this.filterValue.respondStatus = null;

    }
    this.applyFilter();
  }

  onRequestStatusSelected(event) {
    this.requestStatus = event;
    if (event) {
      this.filterValue.requestStatus = event;

    } else {
      this.filterValue.requestStatus = null;

    }
    this.applyFilter();
  }


  applyLocationFilter() {
    this.filterValue.country = this.selectedCountry;
    this.filterValue.region = this.selectedRegion;
    this.filterValue.city = this.selectedCity;

  }

  initLocationsFilter() {
    let filter = '';
    if (this.selectedCountry) {


      filter = filter + '&country=' + this.selectedCountry.id;
    }

    if (this.selectedRegion) {
      filter = filter + '&region=' + this.selectedRegion.id;

    }

    this.locationFilter = filter;

    if (this.regionsComponent) {
      this.regionsComponent.setFilter(filter);
    }

    if (this.citiesComponent) {
      this.citiesComponent.setFilter(filter);
    }


  }

  onCountrySelected(event) {


    if (event) {

      this.selectedCountry = event;

      if (this.selectedRegion) {
        if (this.selectedRegion.country !== this.selectedCountry.id) {
          this.onRegionSelected(null);
        }
      } else {
        this.onRegionSelected(null);
      }

    } else {

      this.clearCountry();
    }

  }

  clearCountry() {
    if (this.selectedCountry) {

      this.selectedCountry = null;
      this.onRegionSelected(null);
    }
  }

  onRegionSelected(event) {

    this.selectedRegion = event;
    if (event) {

      this.selectedCountry = this.selectedRegion.country_details;
      if (this.selectedCity) {
        if (this.selectedCity.region_details !== this.selectedRegion) {
          this.onCitySelected(null);
        }
      } else {
        this.onCitySelected(null);
      }

    } else {
      this.onCitySelected(null);
    }


  }

  onCitySelected(event) {


    this.selectedCity = event;
    if (event) {

      this.selectedRegion = this.selectedCity.region_details;
      this.selectedCountry = this.selectedCity.country_details;
    }


    this.initLocationsFilter();
    this.applyLocationFilter();
    this.applyFilter();

  }

  onFilterAttributes(event) {
    if (event) {
      this.filterValue.filterSet = event;
    } else {
      this.filterValue.filterSet = null;
    }

    this.applyFilter();
  }

  applyFilter() {


    if (this.emitFilter) {


      this.filterService.applyFilter(this.filterValue);
      // console.log(this.filterValue);
      // this.filterApplied.emit(this.filterValue);
    }
  }

  onCreateProduct() {
    this.new_product = true;

  }

  onProductCreated(product: Product) {
    this.new_product = false;
    this.router.navigate(['/product-admin/' + product.id]);
    // this.onMsgPushed({severity: 'success', summary: 'Product', detail: 'Product has created'});


  }


  onMsgPushed(event) {
    this.msgs = [];
    this.msgs.push(event);

  }

  ngOnDestroy() {
    if (this.loadingFinishedSubscription) {
      this.loadingFinishedSubscription.unsubscribe();
      this.loadingFinishedSubscription = null;
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
      this.loadingSubscription = null;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
      this.filterSubscription = null;
    }


  }

}
