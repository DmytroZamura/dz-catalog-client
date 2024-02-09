import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {GeneralService} from '../../general/general.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {PaymentAccount} from './payment-account';
import {isPlatformBrowser} from '@angular/common';

import {MakePaymentDialogComponent} from './make-payment-dialog/make-payment-dialog.component';
import {Currency} from '../../general/currency';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-payment-accounts',
  templateUrl: './payment-accounts.component.html',
  styleUrls: ['./payment-accounts.component.css']
})
export class PaymentAccountsComponent implements OnInit {

  @ViewChild('paymentDialog') paymentDialogComponent: MakePaymentDialogComponent;
  accounts: PaymentAccount[];
  isBrowser = false;
  msgs1: string;
  severity = 'success';

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private service: GeneralService, private router: Router,
              private messageService: StandardMessageService, public app: AppComponent, private activateRoute: ActivatedRoute,
              private translate: TranslateService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.app.appService.setLanguage();
    this.getAccounts();
    const params = this.activateRoute.snapshot.queryParams;
    const status = params.response_status;
    const amount = params.amount;
    const currency = params.currency;

    if (status) {
      if (status === 'success') {
        this.translate.get('PROMOTION.Your transaction is successful').subscribe(res => {
          this.severity = 'success';
          this.msgs1 = res + ' ' + amount + ' ' + currency;
          this.router.navigateByUrl('/payment-accounts');

        });
      } else {
        this.translate.get('PROMOTION.Your transaction is unsuccessful').subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;
          this.router.navigateByUrl('/payment-accounts');

        });
      }
    }

  }


  getAccounts() {
    const url = `${'get-payments-accounts'}`;
    this.service.getItems(url)
      .then(res => {
        this.accounts = res;

      })
      .catch(error => {
        this.handleError(error);
      });
  }

  onMakePayment(account: number, currency: Currency, index: number) {
    this.paymentDialogComponent.showDialog(account, currency, index);
  }

  onPaymentCreated(event) {
    const index = event.index;
    const payment = event.payment;
    let balance = this.accounts[index].balance;
    balance = +balance + +(payment.sum);
    this.accounts[index].balance = balance;
  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
