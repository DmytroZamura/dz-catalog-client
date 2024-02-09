import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getProductLink, ProductShort} from '../product';

@Component({
  selector: 'app-product-info-card',
  templateUrl: './product-info-card.component.html',
  styleUrls: ['./product-info-card.component.css']
})
export class ProductInfoCardComponent implements OnInit {
  @Input() product: ProductShort;
  @Input() current_currency = 1;
  @Input() currencyCode = 'USD';
  @Input() locale = 'en';

  @Output() itemClicked = new EventEmitter<void>();
  price: number;
  priceFrom: number;
  oldPrice: number;
  oldPriceFrom: number;
  productLink: string;


  constructor() {
  }

  ngOnInit() {
    if (this.product.discount_price_to) {
      this.price = this.product.discount_price_to_current_currency;
      this.priceFrom = this.product.discount_price_from_current_currency;
      this.oldPrice = this.product.price_to_current_currency;
      this.oldPriceFrom = this.product.price_from_current_currency;
    } else {
      this.price = this.product.price_to_current_currency;
      this.priceFrom = this.product.price_from_current_currency;
    }
    this.productLink = `${getProductLink(this.product)}${'/'}${this.locale}`;
  }


  onItemClicked() {
    this.itemClicked.emit();
  }


}
