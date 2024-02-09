import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

import {ProductService} from '../product.service';
import {Product} from '../product';
import {Currency} from '../../general/currency';
import {GeneralService} from '../../general/general.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../../config/config.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategoriesNavigatorComponent} from '../../category/categories-navigator/categories-navigator.component';
import {Category} from '../../category/category';
import {AppFilterService} from '../../app-filter.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {SendPostRespondComponent} from '../../post/respond/send-post-respond/send-post-respond.component';
import {Post} from '../../post/post';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  @ViewChild('navigator') navigatorComponent: CategoriesNavigatorComponent;
  @ViewChild('respond') sendRespondComponent: SendPostRespondComponent;
  siteUrl = AppConfig.settings.redirectUri;
  product_id: number;
  currentUserId = 0;
  product: Product;
  current_currency = 1;
  current_currency_details: Currency;
  isBrowser = false;
  language = 'en';
  urlLanguage: string;
  items: MenuItem[];
  activeTab = 0;
  defaultReviewTypeId = AppConfig.settings.defaultReviewTypeId;
  price: number;
  priceFrom: number;
  oldPrice: number;
  oldPriceFrom: number;
  isMobile = false;
  truncateNumber = 100;
  slug: string;
  subject: string;
  sslug: string;


  static setCompanyDetails(res: Product): Product {
    if (res.company_details) {
      if (!res.company_details.name) {
        res.company_details = res.company_default_details;
      }
    }
    return res;
  }


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activateRoute: ActivatedRoute, private productService: ProductService,
              private deviceService: DeviceDetectorService, private filterService: AppFilterService, private router: Router,
              public app: AppComponent,
              private metaService: MetaService, private generalService: GeneralService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private translate: TranslateService, private messageService: StandardMessageService) {
    this.product_id = activateRoute.snapshot.params['id'];
    this.subject = activateRoute.snapshot.params['subject'];
    this.sslug = activateRoute.snapshot.params['sslug'];
    this.slug = activateRoute.snapshot.params['slug'];
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();

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
  }

  ngOnInit() {
    if (this.isBrowser) {


      this.currentUserId = +localStorage.getItem('user_id');

      const current_currency = +localStorage.getItem('currency');

      if (current_currency) {
        this.current_currency = current_currency;
      } else {
        this.current_currency = 1;
      }
    }

    if (this.isMobile) {
      this.truncateNumber = 35;
    }


    this.getCurrentCurrencyDetails();
    this.getProduct();
  }

  onSendRespond(post: Post, index, feedType) {

    if (this.sendRespondComponent) {
      this.sendRespondComponent.showDialog(post, index, feedType);
    }
  }


  initPrice() {
    if (this.product.discount_price_to) {
      this.price = this.product.discount_price_to_current_currency;
      this.priceFrom = this.product.discount_price_from_current_currency;
      this.oldPrice = this.product.price_to_current_currency;
      this.oldPriceFrom = this.product.price_from_current_currency;
    } else {
      this.price = this.product.price_to_current_currency;
      this.priceFrom = this.product.price_from_current_currency;
    }
  }

  initTabs() {
    if (this.product) {
      this.items = [];
      this.translate.get('PRODUCT.Product Overview').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 0;

          }
        });

      });

      const total_posts_qty = this.product.eventsqty.publications + this.product.eventsqty.reviews + this.product.eventsqty.questions;
      this.translate.get('GENERAL.Feed').subscribe(res => {
        this.items.push({
          label: res,
          badge: total_posts_qty.toString(),
          command: (event: any) => {
            this.activeTab = 1;

          }
        });

      });
      this.translate.get('GENERAL.Reviews & Questions').subscribe(res => {
        this.items.push({
          label: res,
          badge: (this.product.eventsqty.related_questions + this.product.eventsqty.related_reviews).toString(),
          command: (event: any) => {
            this.activeTab = 2;

          }
        });

      });
    }
  }

  getCurrentCurrencyDetails() {

    this.generalService.getCurrency(this.current_currency)
      .then(res => {

        this.current_currency_details = res;

      })
      .catch(error => {
        this.handleError(error);
      });


  }


  getProduct() {

    if (this.slug) {
      this.productService.getProductBySlug(this.subject, this.sslug, this.slug, this.current_currency)
        .then(res => {
          res = ProductViewComponent.setCompanyDetails(res);
          this.product = res;
          this.initTabs();
          this.initPrice();

          this.setMeta();

        })
        .catch(error => {
          console.log(error);
        });

    } else {
      this.productService.getProduct(this.product_id, this.current_currency)
        .then(res => {


            res = ProductViewComponent.setCompanyDetails(res);
            this.product = res;

            this.initTabs();
            this.initPrice();

            this.setMeta();
          }
        )
        .catch(error => {
          this.handleError(error);
        });
    }
  }


  setMeta() {

    let title = this.product.seo_title;

    if (!title) {

      title = this.product.name;
      if (this.product.company_details) {
        if (this.product.company_details.country_details) {
          title = title + ' | ' + this.product.company_details.country_details.name;
        }

        if (this.product.company_details.city_details) {
          title = title + ', ' + this.product.company_details.city_details.name;
        }

        if (this.product.company_details.name) {
          title = title + ' | ' + this.product.company_details.name;
        } else {
          title = title + ' | ' + this.product.company_default_details.name;
        }
      } else {
        if (this.product.user_data.user_profile.country_details) {
          title = title + ' | ' + this.product.user_data.user_profile.country_details.name;
        }

        if (this.product.user_data.user_profile.city_details) {
          title = title + ', ' + this.product.user_data.user_profile.city_details.name;
        }
        if (this.product.user_data.user_profile.full_name) {
          title = title + ' | ' + this.product.user_data.user_profile.full_name;
        } else {
          title = title + ' | ' + this.product.user_data.user_profile_default.full_name;
        }
      }
    }

    let imageUrl = null;

    if (this.product.images[0]) {
      imageUrl = this.product.images[0].image_details.medium_image_url;
    }

    let slug = this.product.id.toString();
    if (this.slug) {
      slug = this.subject + '/' + this.sslug + '/' + this.slug;
    }
    this.metaService.addMetaTags('product', slug,
      this.urlLanguage, title, this.product.seo_description, imageUrl, true, 'article',
      null, false, null, false);

  }

  onSelectCategory(category: Category) {


    this.filterService.changeCategory(category, 'products/' + this.language);


  }

  onOrderPageClick() {
    window.open(this.product.link_to_buy, '_blank');


  }


  private handleError(error: any): void {
    if (this.isBrowser) {
      this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);
    }
  }

}
