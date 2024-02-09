import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PaymentOrder} from '../promotion';

@Component({
  selector: 'app-payment-order-item',
  templateUrl: './payment-order-item.component.html',
  styleUrls: ['./payment-order-item.component.css']
})
export class PaymentOrderItemComponent implements OnInit {

  @Input() order: PaymentOrder;
  @Input() index = 0;
  @Input() currencyCode: string;
  constructor( public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
