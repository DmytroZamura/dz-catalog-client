import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Category} from '../category/category';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../meta.service';
import {ActivatedRoute} from '@angular/router';
import {AppFilterService} from '../app-filter.service';
import {UniversalFilter} from '../common/universal-filter';
import {AppComponent} from '../app.component';
import {Currency} from '../general/currency';
import {GeneralService} from '../general/general.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentUserId = 0;
  currentCurrency = 1;
  currentCurrencyDetails: Currency;
  active_index = 0;
  selectedCategory: Category;
  isBrowser = false;
  language = 'en';
  urlLanguage: string;
  paramsChecked = false;
  appliedFilter: UniversalFilter;
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private metaService: MetaService, public app: AppComponent,
              private deviceService: DeviceDetectorService,
              private activateRoute: ActivatedRoute, private filterService: AppFilterService, private service: GeneralService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    const language = activateRoute.snapshot.params['language'];
    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      this.app.appService.setLanguage();
      this.language = localStorage.getItem('language_code');

    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }
    if (this.currentUserId !== 0) {
      this.active_index = 1;
    }

    const params = activateRoute.snapshot.queryParams;
    this.getUniversalFilter(params);

  }


  getUniversalFilter(params: any) {
    this.filterService.getUniversalFilter(JSON.stringify(params), this.language)
      .then(res => {


        this.metaService.addMetaTags('products', null,
          this.urlLanguage, null, null, null, true, null, res);


        if (res) {
          // if (this.isBrowser) {
          //   this.filterService.initNavigation(3, null, 'products', false, res);
          //
          // }
          this.appliedFilter = res;
          this.paramsChecked = true;
        }

      })


      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {


    this.app.appService.setLanguage();
    this.getCurrentCurrencyDetails();


    if (this.isBrowser) {

      setTimeout(() => {

        this.app.appService.checkWelcomeMessage();

      }, 2500);

      const currentCurrency = +localStorage.getItem('currency');

      if (currentCurrency) {
        this.currentCurrency = currentCurrency;
      }

    }


  }

  getCurrentCurrencyDetails() {

    this.service.getCurrency(this.currentCurrency)
      .then(res => {

        this.currentCurrencyDetails = res;


      })
      .catch(error => {
        console.log(error);
      });


  }


  onCategorySelected(event) {
    this.selectedCategory = event;
  }


}
