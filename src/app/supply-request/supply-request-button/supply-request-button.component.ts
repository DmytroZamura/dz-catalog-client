import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {Product, ProductShort} from '../../product/product';
import {SupplyRequest, SupplyRequestPosition} from '../supply-request';
import {Currency} from '../../general/currency';
import {GeneralService} from '../../general/general.service';
import {UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {AppComponent} from '../../app.component';
import {StandardMessageService} from '../../standard-message.service';
import {AppConfig} from '../../config/config.service';
import {UserOrCompany} from '../../common/select-user-or-company/user-or-company';

@Component({
  selector: 'app-supply-request-button',
  templateUrl: './supply-request-button.component.html',
  styleUrls: ['./supply-request-button.component.css']
})
export class SupplyRequestButtonComponent implements OnInit {

  @Input() supplier_user: UserWithProfile;
  @Input() supplier_company: CompanyShort;
  @Input() currency: Currency;
  @Input() product: Product;

  @Output() createdSupplyRequest = new EventEmitter<number>();
  @Output() msgPushed = new EventEmitter<any>();
  @ViewChild('requestForm') requestForm;
   statusId = AppConfig.settings.newRespondStatus;
  showDialog = false;


  isBrowser = false;


  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private generalService: GeneralService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private messageService: StandardMessageService,
              public app: AppComponent) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {

    if (this.isBrowser) {

      if (!this.currency) {
        this.getCurrentCurrencyDetails();
      }
    }
  }

  getCurrentCurrencyDetails() {

    let current_currency = +localStorage.getItem('currency');

    if (!current_currency) {


      current_currency = 1;
    }

    this.generalService.getCurrency(current_currency)
      .then(res => {

        this.currency = res;


      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onCreateSupplyRequest(event) {
    if (this.app.appService.isAuthenticated()) {

      this.createdSupplyRequest.emit(event);
    } else {
      this.app.appService.showAuthDialog = true;
    }
  }


  showSelectRoleDialog() {
    if (this.app.appService.isAuthenticated()) {

      if (this.app.appService.userProfile.has_companies) {
        this.showDialog = true;
      } else {
        const profile = new UserOrCompany();
        profile.user = true;
        profile.id = this.app.appService.userProfile.user_id;
        profile.name = this.app.appService.userProfile.full_name;
        profile.country_details = this.app.appService.userProfile.country_details;
        profile.city_details = this.app.appService.userProfile.city_details;
        this.createSupplyRequest(profile);
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }
  }


  createSupplyRequest(event) {

    this.showDialog = false;
    if (this.app.appService.userProfile) {
      const request = new SupplyRequest();


      if (event.user) {
        request.customer_user = event.id;
        request.customer_company = null;
        request.customer_company_details = null;
      } else {
        request.customer_company = event.id;

        request.customer_user = null;
        request.customer_user_details = null;
      }

      request.status = this.statusId;
      request.skype = this.app.appService.userProfile.skype;
      request.contact_email = this.app.appService.userProfile.contact_email;
      request.contact_phone = this.app.appService.userProfile.contact_phone;

      if (this.supplier_company) {
        request.supplier_company = this.supplier_company.id;
        request.supplier_company_details = this.supplier_company as CompanyShort;
      } else {
        request.supplier_user = this.supplier_user.user_profile_default.user_id;
        request.supplier_user_details = this.supplier_user;
      }


      if (!this.product) {
        request.currency = this.currency.id;
        request.currency_details = this.currency;
      }

      if (this.product) {
        request.currency = this.product.currency;
        request.currency_details = this.product.currency_details;
        request.positions = [];
        const new_position = new SupplyRequestPosition();
        new_position.product = this.product.id;
        new_position.product_details = new ProductShort();

        new_position.product_details = this.product as ProductShort;

        new_position.quantity = 1;
        if (this.product.one_price) {
          if (!this.product.discount_price_to) {
            new_position.price = this.product.price_to;
            new_position.total = this.product.price_to;
            request.total_amount = this.product.price_to;
          } else {
            new_position.price = this.product.discount_price_to;
            new_position.total = this.product.discount_price_to;
            request.total_amount = this.product.discount_price_to;
          }
        }
        request.positions.push(new_position);

      }

      this.requestForm.newSupplyRequest(request);
    }

  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}
