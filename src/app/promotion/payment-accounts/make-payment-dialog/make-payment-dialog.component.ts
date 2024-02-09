import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Currency} from '../../../general/currency';
import {GeneralService} from '../../../general/general.service';
import {StandardMessageService} from '../../../standard-message.service';
import {Payment} from '../payment-account';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';


@Component({
  selector: 'app-make-payment-dialog',
  templateUrl: './make-payment-dialog.component.html',
  styleUrls: ['./make-payment-dialog.component.css']
})
export class MakePaymentDialogComponent implements OnInit {
  @Input() locale;
  @Input() callbackLink = 'payment-accounts';
  @Output() paymentCreated = new EventEmitter<any>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  visible = false;
  account: number;
  sum = 0;
  min = 1;
  qty = 1;
  currency: Currency;
  index: number;


  constructor(private service: GeneralService, private messageService: StandardMessageService) {
  }

  ngOnInit(): void {
  }


  showDialog(account: number, currency: Currency, index = 0, sum = 0, callbackLink = 'payment-accounts', qty = 1) {


    this.currency = currency;
    this.index = index;
    this.qty = qty;
    this.callbackLink = callbackLink;
    if (sum) {
      this.sum = sum;
    } else {
      if (currency.code === 'UAH') {
        this.sum = 100;
        // this.locale = 'uk-UA';
      } else {
        this.sum = 5;
        // this.locale = 'en-US';
      }
    }
    if (currency.code === 'UAH') {
      this.min = 100;
      // this.locale = 'uk-UA';
    } else {
      this.min = 5;
      // this.locale = 'en-US';
    }
    this.account = account;
    this.visible = true;
  }

  createPayments() {
    // this.processDialogComponent.show();
    const url = `${'create-payment'}`;
    const payment = new Payment();
    payment.account = this.account;
    payment.sum = this.sum;
    payment.callback_link = this.callbackLink + '?account=' + this.account + '&amount=' + this.sum + '&currency=' +
      this.currency.code + '&qty=' + this.qty;
    this.service.createItem(url, payment)
      .then(res => {
        // this.processDialogComponent.close();
        window.open(res, '_self');
        this.visible = false;
        // this.messageService.addMessage({
        //   severity: 'success',
        //   summary: 'Payment',
        //   detail: 'Successfully processed'
        // });
        // this.paymentCreated.emit({index: this.index, payment: res});


      })
      .catch(error => {
        this.processDialogComponent.close();
        this.handleError(error);
      });
  }

  onCancel() {
    this.visible = false;
    this.sum = 0;
    this.currency = null;
    this.account = null;
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
