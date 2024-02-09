import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Company} from '../company';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {AppConfig} from '../../config/config.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';
import {Currency} from '../../general/currency';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit {
  isBrowser = false;
  slug: string;
  company: Company;
  isMobile = false;
  currentUserId = 0;
  items: MenuItem[];
  activeTab = 0;
  language = 'en';
  urlLanguage: string;
  rootPath = 'company';
  currentCurrencyDetails: Currency;
  currentCurrency = 1;
  defaultReviewTypeId = AppConfig.settings.defaultReviewTypeId;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,
              private activateRoute: ActivatedRoute,
              private service: GeneralService,
              private deviceService: DeviceDetectorService, private messageService: StandardMessageService,
              private router: Router, private translate: TranslateService, public app: AppComponent,
              private metaService: MetaService) {
    this.isMobile = this.deviceService.isMobile();
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.slug = activateRoute.snapshot.params['slug'];

    const language = activateRoute.snapshot.params['language'];
    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      if (this.isBrowser) {
        this.app.appService.setLanguage();
        this.language = localStorage.getItem('language_code');
      } else {
        this.language = this.metaService.checkLanguage('en');
        this.language = 'en';
      }


    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }
    const currentCurrency = +localStorage.getItem('currency');

    if (currentCurrency) {
      this.currentCurrency = currentCurrency;
    }


  }

  ngOnInit() {

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }

    this.getCurrentCurrencyDetails();
    this.initData();

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

  setMeta() {
    let title = this.company.name + ' | UaFine';
    if (this.company.seo_title) {
      title = this.company.seo_title;
    }

    let imageUrl = null;

    if (this.company.logo) {
      imageUrl = this.company.logo_details.file_url;
    }
    this.metaService.addMetaTags(this.rootPath, this.slug,
      this.urlLanguage, title, this.company.seo_description, imageUrl, true, 'article', null, false,
      null, false);
  }

  initData(): void {
    const url = `${'get-company-by-slug-in-language/'}${this.slug}${'/'}${this.language}`;
    this.service.getItem(url)
      .then(res => {
        this.company = res;
        this.setMeta();

        this.initMenu();

      })
      .catch(error => {
        this.handleError(error);
      });


  }

  initMenu() {
    this.items = [];
    const total_posts_qty = this.company.eventsqty.jobposts + this.company.eventsqty.offerings + this.company.eventsqty.publications
      + this.company.eventsqty.requests + this.company.eventsqty.reviews + this.company.eventsqty.questions;

    this.translate.get('COMPANY.Company Overview').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 0;

        }
      });

    });

    this.translate.get('GENERAL.Timeline').subscribe(res => {
      this.items.push({
        label: res,
        badge: total_posts_qty.toString(),
        command: (event: any) => {
          this.activeTab = 1;

        }
      });

    });

    this.translate.get('PRODUCT.Products').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.company.eventsqty.products.toString(),
        command: (event: any) => {
          this.activeTab = 2;

        }
      });

    });

    this.translate.get('GENERAL.Reviews & Questions').subscribe(res => {
      this.items.push({
        label: res,
        badge: (this.company.eventsqty.related_reviews + this.company.eventsqty.related_questions).toString(),
        command: (event: any) => {
          this.activeTab = 3;

        }
      });

    });

    this.translate.get('COMPANY.Employees').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.company.eventsqty.employees.toString(),
        command: (event: any) => {
          this.activeTab = 4;

        }
      });

    });

    this.translate.get('GENERAL.Followers').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.company.eventsqty.followers.toString(),
        command: (event: any) => {
          this.activeTab = 5;

        }
      });

    });


  }

  onCreateProduct() {
    this.app.onCreateProduct(this.company.id);

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}

