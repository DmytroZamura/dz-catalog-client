import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

import {Category} from '../../category/category';
import {BrowserService} from '../../browser.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';

import {Currency} from '../../general/currency';


@Component({
  selector: 'app-community-products',
  templateUrl: './community-products.component.html',
  styleUrls: ['./community-products.component.css']
})
export class CommunityProductsComponent implements OnInit {
  @Input() community: number;
  @Input() isMobile = false;
  @Input() locale = 'en';
  @Output() msgPushed = new EventEmitter<any>();
  isBrowser = false;
  currentUserId = 0;
  activeIndex = 0;
  selectedCategory: Category;
  currentCurrencyDetails: Currency;

  currentCurrency = 1;

  constructor(private browserService: BrowserService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private messageService: StandardMessageService, private service: GeneralService) {
    this.isBrowser = browserService.isBrowser;

    this.currentUserId = +localStorage.getItem('user_id');
    if (this.currentUserId !== 0) {
      this.activeIndex = 1;
    }
    const current_currency = +localStorage.getItem('currency');

    if (current_currency) {
      this.currentCurrency = current_currency;
    }

  }

  ngOnInit() {

    this.getCurrentCurrencyDetails();

  }


  onCategorySelected(event) {
    this.selectedCategory = event;
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


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
