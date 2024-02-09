import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {AppFilterService} from '../../../app-filter.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {Currency} from '../../../general/currency';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {StandardMessageService} from '../../../standard-message.service';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-company-products-admin',
  templateUrl: './company-products-admin.component.html',
  styleUrls: ['./company-products-admin.component.css']
})
export class CompanyProductsAdminComponent implements OnInit {
  @Input() company_id: number;
  @Input() isMobile = false;
  @Input() locale = 'en';
  @Input() currentUserId = 0;
  isBrowser = false;
  currentCurrencyDetails: Currency;
  currentCurrency = 1;

  constructor(@Inject(PLATFORM_ID) private platformId: object, public app: AppComponent,
              private filterService: AppFilterService, private router: Router, @Inject(LOCAL_STORAGE) private localStorage: any,
             private service: GeneralService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const current_currency = +localStorage.getItem('currency');

    if (current_currency) {
      this.currentCurrency = current_currency;
    }

  }

  ngOnInit() {
    this.getCurrentCurrencyDetails();
    this.filterService.initNavigation(621, this.company_id, 'products');


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
    this.app.onCreateProduct(this.company_id);

  }


}
