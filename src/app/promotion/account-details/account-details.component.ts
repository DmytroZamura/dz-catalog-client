import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from '../../general/general.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {PaymentAccount} from '../payment-accounts/payment-account';
import {StandardMessageService} from '../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {Currency} from '../../general/currency';
import {MakePaymentDialogComponent} from '../payment-accounts/make-payment-dialog/make-payment-dialog.component';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('paymentDialog') paymentDialogComponent: MakePaymentDialogComponent;
  id: number;
  account: PaymentAccount;
  msgs1: string;
  severity = 'success';
  callBackUrl = 'account-details';
  items: MenuItem[];
  activeTab = 0;

  constructor(private service: GeneralService, private activateRoute: ActivatedRoute, public app: AppComponent,
              private translate: TranslateService, private router: Router,
              private messageService: StandardMessageService) {
  }

  ngOnInit(): void {
    this.app.appService.setLanguage();
    this.initMenu();
    this.activateRoute.params.subscribe(routeParams => {
      if (this.id !== routeParams.id) {
        this.id = routeParams.id;

        this.callBackUrl = this.callBackUrl + '/' + this.id;

        const params = this.activateRoute.snapshot.queryParams;
        const status = params.response_status;
        const amount = params.amount;
        const currency = params.currency;


        if (status) {

          if (status === 'success') {
            this.translate.get('PROMOTION.Your transaction is successful').subscribe(res => {
              this.severity = 'success';
              this.msgs1 = res + ' ' + amount + ' ' + currency;
              this.router.navigateByUrl('/' + this.callBackUrl);

            });
          } else {
            this.translate.get('PROMOTION.Your transaction is unsuccessful').subscribe(res => {
              this.severity = 'error';
              this.msgs1 = res;
              this.router.navigateByUrl('/' + this.callBackUrl);

            });
          }
        }
        this.initData();

      }
    });

  }


  initData() {
    const url = `${'get-payment-account/'}${this.id}`;
    this.service.getItem(url)
      .then(res => {
        this.account = res;


      })
      .catch(error => {
        this.handleError(error);

      });
  }

    initMenu() {
    this.items = [];
    this.translate.get('PROMOTION.Balance top-ups').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 0;

        }

      });

    });
    this.translate.get('PROMOTION.Promotion orders').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 1;

        }

      });

    });





  }


  onMakePayment(account: number, currency: Currency) {

    this.paymentDialogComponent.showDialog(account, currency, 0, 0, this.callBackUrl);
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
