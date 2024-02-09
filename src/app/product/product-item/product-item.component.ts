import {Component, Input, OnInit} from '@angular/core';
import {getProductLink, ProductShort} from '../product';
import {CompanyShort} from '../../company/company';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() currentUserId: number;
  @Input() truncateNumber = 15;
  @Input() product: ProductShort;
  @Input() showPreview = true;
  @Input() adminMode = false;
  @Input() currencyCode: string;
  @Input() isMobile = false;
  @Input() locale = 'en';
  company: CompanyShort;
  price: number;
  priceFrom: number;
  oldPrice: number;
  oldPriceFrom: number;
  productLink: string;

  constructor() {
  }

  ngOnInit() {
    if (this.isMobile) {
      this.truncateNumber = 13;
    }

    if (this.product.company_details) {
      if (this.product.company_details.name) {
        this.company = this.product.company_details;
      } else {
        this.company = this.product.company_default_details;
      }
    }

    if (this.product.discount_price_to) {
      this.price = this.product.discount_price_to_current_currency;
      this.priceFrom = this.product.discount_price_from_current_currency;
      this.oldPrice = this.product.price_to_current_currency;
      this.oldPriceFrom = this.product.price_from_current_currency;
    } else {
      this.price = this.product.price_to_current_currency;
      this.priceFrom = this.product.price_from_current_currency;
    }

    this.generateProductUrl();
  }


  generateProductUrl() {

   this.productLink = `${getProductLink(this.product)}${'/'}${this.locale}`;



  }


}
