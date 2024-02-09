import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';

import {AppFilterService} from '../../app-filter.service';
import {AppComponent} from '../../app.component';
import {Currency} from '../../general/currency';
import {isPlatformBrowser} from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-user-products-admin',
  templateUrl: './user-products-admin.component.html',
  styleUrls: ['./user-products-admin.component.css']
})
export class UserProductsAdminComponent implements OnInit {


  @Input() isMobile = false;
  @Input() locale = 'en';
  @Input() currentUserId = 0;
  isBrowser = false;
  currentCurrencyDetails: Currency;
  currentCurrency = 1;



  constructor(private filterService: AppFilterService, public app: AppComponent, @Inject(PLATFORM_ID) private platformId: object,
              @Inject(LOCAL_STORAGE) private localStorage: any, private service: GeneralService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const current_currency = +localStorage.getItem('currency');

    if (current_currency) {
      this.currentCurrency = current_currency;
    }
  }

  ngOnInit() {
    this.getCurrentCurrencyDetails();
    this.filterService.initNavigation(721, this.currentUserId, 'products');
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


  onCreateProduct() {
    this.app.onCreateProduct();

  }


}
