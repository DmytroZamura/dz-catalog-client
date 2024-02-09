import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentAccount} from '../payment-account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-account-preview',
  templateUrl: './payment-account-preview.component.html',
  styleUrls: ['./payment-account-preview.component.css']
})
export class PaymentAccountPreviewComponent implements OnInit {
  @Input() account: PaymentAccount;
  @Input() shortMode = false;
  @Input() showDetails = true;
  @Output() makePaymentClicked = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {

    if (!this.account.company_details?.name) {
      this.account.company_details = this.account.company_default_details;
    }
  }

  showAccountDetails() {
    this.router.navigateByUrl('/account-details/' + this.account.id);
  }

  onMakePayment() {
    this.makePaymentClicked.emit();
  }

}
