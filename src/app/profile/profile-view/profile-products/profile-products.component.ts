import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {Currency} from '../../../general/currency';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.css']
})
export class ProfileProductsComponent implements OnInit {
  @Input() profile: number;
  @Input() userId: number;
  @Input() currentUserId = 0;
  @Input() isMobile = false;
  @Input() locale = 'en';
  isBrowser = false;
  currentCurrencyDetails: Currency;
  currentCurrency = 1;


  constructor(public app: AppComponent, @Inject(PLATFORM_ID) private platformId: object,
              @Inject(LOCAL_STORAGE) private localStorage: any, private service: GeneralService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const current_currency = +localStorage.getItem('currency');

    if (current_currency) {
      this.currentCurrency = current_currency;
    }
  }

  ngOnInit() {

    this.getCurrentCurrencyDetails();
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
