import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentProduct} from '../promotion';

@Component({
  selector: 'app-payment-product-preview',
  templateUrl: './payment-product-preview.component.html',
  styleUrls: ['./payment-product-preview.component.css']
})
export class PaymentProductPreviewComponent implements OnInit {
  @Input() product: PaymentProduct;
  @Input() showTitle = true;
  @Input() showOrderForm = false;
  @Input() price: number;
  @Input() balance: number;
  @Input() currencyCode: string;
  @Input() qty = 3;
  @Output() makePaymentClicked = new EventEmitter<number>();
  @Output() orderCreated = new EventEmitter<number>();
  difference: number;


  total: number;

  constructor() {
  }

  ngOnInit(): void {
    this.calculateTotal();

  }

  createOrder() {

    this.orderCreated.emit(this.qty);
  }


  onCancel() {

  }

  updateBalance(balance: number) {
    this.balance = balance;
    this.calculateDifference();
  }

  closeForm() {
    this.showOrderForm = false;
  }

  calculateDifference() {
    if (this.total > this.balance) {
      let difference = this.total - this.balance;
      if (difference < 100 && this.currencyCode === 'UAH') {
        difference = 100;
      }
      if (difference < 5 && this.currencyCode !== 'UAH') {
        difference = 5;
      }

      this.difference = difference;
    } else {
      this.difference = null;
    }

  }

  calculateTotal() {
    this.total = this.qty * this.price;
    this.calculateDifference();
  }

  getQTY(): number {
    return this.qty;
  }

  onMakePayments() {
    this.makePaymentClicked.emit(this.difference);
  }

}
