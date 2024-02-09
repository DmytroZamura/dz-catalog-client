import {Injectable, Output, EventEmitter, Inject, PLATFORM_ID, Directive} from '@angular/core';
import { FilterParams, RouteParams, UniversalFilter} from './common/universal-filter';
import {FilterValue, FilterValueDB} from './attribute/attribute';
import {Category} from './category/category';
import {Router} from '@angular/router';
import {AppConfig} from './config/config.service';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from './utils.service';
import {isPlatformBrowser} from '@angular/common';
import {AppService} from './app.service';


@Injectable({
  providedIn: 'root'
})
export class AppFilterService {

  @Output() changeLocationFilter: EventEmitter<any> = new EventEmitter();
  @Output() changeShowPostsFilter: EventEmitter<boolean> = new EventEmitter();
  @Output() initNavigationWidget: EventEmitter<any> = new EventEmitter();
  @Output() filterApplied: EventEmitter<UniversalFilter> = new EventEmitter();
  @Output() filterChanged: EventEmitter<UniversalFilter> = new EventEmitter();
  @Output() filterLoadingStarted = new EventEmitter();
  @Output() filterLoadingFinished = new EventEmitter();

  filterInitialized = false;
  currentFilter = new UniversalFilter();
  currentNavigationObject = 1;
  currentObject: any;
  currentItemsType: string;
  appliedFilter: boolean;
  categoryNavigationRoutes = ['/', 'feed', 'companies', 'products', 'communities'];
  isBrowser = false;
  endpoint = AppConfig.settings.endPointUrl;


  static formParamsString(filter: UniversalFilter): string {


    let filter_str = '';

    let first = true;

    if (filter) {

      if (filter.post_type) {
        filter_str = filter_str + '?post_type=' + filter.post_type.code;
        first = false;
      }


      if (filter.country) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'country=' + filter.country.slug;

      }

      if (filter.city) {

        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }

        filter_str = filter_str + 'city=' + filter.city.slug;

      }

      if (filter.category) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
        }
        filter_str = filter_str + 'category=' + filter.category.slug;
      }


      if (filter.job_type) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'job_type=' + filter.job_type.slug;

      }

      if (filter.job_function) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'job_function=' + filter.job_function.slug;

      }

      if (filter.seniority_label) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }

        filter_str = filter_str + 'seniority_label=' + filter.seniority_label.slug;

      }


      if (filter.company_industry) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'company_industry=' + filter.company_industry.slug;
      }

      if (filter.company_type) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'company_type=' + filter.company_type.slug;
      }
      if (filter.company_size) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {
          first = false;
          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'company_size=' + filter.company_size.slug;
      }


      if (filter.product_group) {
        if (!first) {
          filter_str = filter_str + '&';

        } else {

          filter_str = filter_str + '?';
        }
        filter_str = filter_str + 'product_group=' + filter.product_group.id;
      }


    }

    return filter_str;


  }

  static formQueryParams(filter: UniversalFilter): RouteParams {


    const params = new RouteParams();

    // [queryParams]="{ id: {{id}} }"

    if (filter) {

      if (filter.category) {
        params.category = filter.category.slug;
      }

      if (filter.country) {
        params.country = filter.country.slug;

      }
      if (filter.region) {
        params.region = filter.region.slug;

      }
      if (filter.city) {
        params.city = filter.city.slug;

      }


      if (filter.job_type) {
        params.job_type = filter.job_type.slug;

      }

      if (filter.job_function) {
        params.job_function = filter.job_function.slug;

      }

      if (filter.seniority_label) {

        params.seniority_label = filter.seniority_label.slug;

      }


      if (filter.post_type) {
        params.post_type = filter.post_type.code;
      }

      if (filter.company_type) {
        params.company_type = filter.company_type.slug;
      }
      if (filter.company_size) {
        params.company_size = filter.company_size.slug;
      }
      if (filter.company_industry) {
        params.company_industry = filter.company_industry.slug;
      }

      if (filter.product_group) {
        params.product_group = filter.product_group.id;
      }


    }

    return params;


  }

  static formFilterQueryParams(filter: UniversalFilter): FilterParams {

    const params = new FilterParams();

    if (filter) {

      if (filter.category) {
        params.category = filter.category.id;
      }

      if (filter.country) {
        params.country = filter.country.id;

      }

      if (filter.region) {
        params.region = filter.region.id;

      }
      if (filter.city) {
        params.city = filter.city.id;

      }


      if (filter.job_type) {
        params.job_type = filter.job_type.id;

      }

      if (filter.job_function) {
        params.job_function = filter.job_function.id;

      }

      if (filter.seniority_label) {

        params.seniority = filter.seniority_label.id;

      }

      if (filter.post_type) {
        params.post_type = filter.post_type.id;
      }


    }

    return params;


  }

  static getFilterDBValues(filter: FilterValue[]): FilterValueDB[] {


    const filterBD: FilterValueDB[] = [];

    for (const attribute of filter) {
      const attributeBD = new FilterValueDB();
      attributeBD.attribute = attribute.attribute.id;
      attributeBD.multiple = attribute.multiple;
      attributeBD.type = attribute.type;
      attributeBD.value_boolean = attribute.value_boolean;
      attributeBD.values = attribute.values;
      if (attribute.value_list) {
        attributeBD.value_list = attribute.value_list.id;
      }
      filterBD.push(attributeBD);
    }


    return filterBD;


  }


  constructor(private router: Router, public http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private appService: AppService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  getUniversalFilter(query: string, language: string): Promise<UniversalFilter> {
    if (!language) {
      language = 'en';
    }
    const url = `${this.endpoint}${'get-universal-filter/'}${query}${'/'}${language}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as UniversalFilter)
      .catch(UtilsService.handleError);
  }


  filterLocations(country_id: number, city_id: number) {

    this.changeLocationFilter.emit({country_id: country_id, city_id: city_id});
  }

  onLoadingStarted() {
    this.filterLoadingStarted.emit();
  }

  onLoadingFinished() {
    this.filterLoadingFinished.emit();
  }

  showPosts(show_status: boolean) {
    this.changeShowPostsFilter.emit(show_status);
  }

  initNavigation(navigationObject: number, object: number, itemsType: string, applyFilter = true, filter = null) {

    if (this.isBrowser ) {

      if (!this.filterInitialized) {
        this.filterInitialized = true;
      }


      this.currentNavigationObject = navigationObject;
      this.currentObject = object;
      this.currentItemsType = itemsType;
      this.appliedFilter = applyFilter;
      this.currentFilter = filter;


      this.initNavigationWidget.emit({
        navigationObject: navigationObject,
        object: object,
        itemsType: itemsType,
        applyFilter: applyFilter,
        filter: filter
      });
    }
  }

  applyFilter(filter: UniversalFilter) {

    this.currentFilter = filter;

    const params = AppFilterService.formQueryParams(filter);

    if (this.isBrowser) {
      this.router.navigate([], {
        queryParams: params
      });
    }

    this.filterApplied.emit(filter);

  }

  changeFilter(filter: UniversalFilter, rout = null) {


    this.currentFilter = filter;
    if (rout) {
      const params = AppFilterService.formQueryParams(this.currentFilter);

      this.router.navigate([rout], {
        queryParams: params
      });
    } else {
      if (this.appService.sideBarLoad) {
        this.filterChanged.emit(this.currentFilter);
      } else {
        this.applyFilter(filter);
      }
    }

  }


  changeCategory(category: Category, rout = null, checkNavigationObject = false) {
    this.currentFilter.category = category;
    let goToRout = true;
    if (checkNavigationObject) {
      const urlWithoutParams = UtilsService.getCurrentPrimeRout(this.router.parseUrl(this.router.url));

      if (this.categoryNavigationRoutes.includes(urlWithoutParams)) {
        goToRout = false;
      }
    }

    if (rout && goToRout) {
      const params = AppFilterService.formQueryParams(this.currentFilter);

      this.router.navigate([rout], {
        queryParams: params
      });
    } else {
      this.filterChanged.emit(this.currentFilter);
    }

  }


}
