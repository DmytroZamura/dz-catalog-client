import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../product';

import {ActivatedRoute, Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../product.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {MetaService} from '../../meta.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {BrowserService} from '../../browser.service';


@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  slug: string;
  product: Product;
  currentUserId = 0;
  items: MenuItem[];
  activeTab = 0;
  product_id: number;
  currentCurrency = 1;
  isMobile = false;
  language = 'en';
   isBrowser = false;



  constructor(private activateRoute: ActivatedRoute,   private messageService: StandardMessageService,
              private metaService: MetaService, private productService: ProductService, private translate: TranslateService,
              private router: Router, @Inject(LOCAL_STORAGE) private localStorage: any,
              public app: AppComponent, private browserService: BrowserService) {
    this.product_id = activateRoute.snapshot.params['id'];
  this.isBrowser = browserService.isBrowser;

  }


  ngOnInit() {

    this.app.appService.setLanguage();
    this.language = this.translate.currentLang;


    if (!this.app.appService.isAuthenticated()) {
      this.router.navigate(['/']);
    }


    const currentCurrency = +localStorage.getItem('currency');

    if (currentCurrency) {
      this.currentCurrency = currentCurrency;
    }

    this.currentUserId = +localStorage.getItem('user_id');
    this.items = [];
    this.translate.get('PRODUCT.Product Overview').subscribe(res => {
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
        command: (event: any) => {
          this.activeTab = 1;

        }
      });

    });

    this.metaService.addMetaTags('product-admin', null,
      null, null, null, null, false, null, null);

    this.initData();
  }


  initData(): void {

    this.productService.getProductInLanguage(this.product_id, 'en', this.currentCurrency)
      .then(res => {

        this.product = res;
        if (!this.product.admin_status) {

          this.router.navigate(['/']);
        }


      })
      .catch(error => {
        this.handleError(error);
      });

  }

  onProductDeleted() {
    if (this.product.company) {
      this.router.navigate(['company-admin/' + this.product.company_details.slug + '/2']);
    } else {
      this.router.navigate(['profile/2']);
    }
  }




  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}
