import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../payment-accounts/payment-account';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.css']
})
export class PaymentItemComponent implements OnInit {
  @Input() payment: Payment;
  @Input() index = 0;
  @Input() currencyCode: string;
  constructor( public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
