import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from '../general/general.service';
import {PaymentAccount} from './payment-accounts/payment-account';
import {ActivatedRoute, Router} from '@angular/router';
import {StandardMessageService} from '../standard-message.service';
import {AppComponent} from '../app.component';
import {PaymentOrder, Promotion} from './promotion';
import {Currency} from '../general/currency';
import {MakePaymentDialogComponent} from './payment-accounts/make-payment-dialog/make-payment-dialog.component';
import {PaymentProductPreviewComponent} from './payment-product-preview/payment-product-preview.component';
import {ProcessDialogComponent} from '../common/process-dialog/process-dialog.component';
import {PostPreviewComponent} from '../post/post-preview/post-preview.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  @ViewChild('paymentDialog') paymentDialogComponent: MakePaymentDialogComponent;
  @ViewChild('productPreview') paymentProductComponent: PaymentProductPreviewComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  @ViewChild('postPreview') postPreviewComponent: PostPreviewComponent;
  account: PaymentAccount;
  productCode: string;
  objectID: number;
  msgs1: string;
  severity = 'success';
  promotion: Promotion;
  postCodes = ['post-promotion', 'post-grade'];
  callBackUrl = 'promotion';
  qty = 3;

  constructor(private service: GeneralService, private activateRoute: ActivatedRoute, public app: AppComponent,
              private router: Router, private translate: TranslateService,
              private messageService: StandardMessageService) {
  }

  ngOnInit(): void {
    this.app.appService.setLanguage();
    this.activateRoute.params.subscribe(routeParams => {
      if (this.productCode !== routeParams.code || this.objectID !== routeParams.id) {
        this.productCode = routeParams.code;
        this.objectID = routeParams.id;
        this.callBackUrl = this.callBackUrl + '/' + this.productCode + '/' + this.objectID;


        const params = this.activateRoute.snapshot.queryParams;
        const status = params.response_status;
        const amount = params.amount;
        const currency = params.currency;


        if (status) {
          this.qty = +params.qty;
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
    const url = `${'get-payment-product-price-by-object/'}${this.productCode}${'/'}${this.objectID}`;
    this.service.getItem(url)
      .then(res => {
        if (this.productCode === 'post-grade') {
          this.qty = 1;
        }

        if (this.productCode === 'post-promotion') {
          this.qty = 3;
        }
        this.promotion = res;


      })
      .catch(error => {
        console.log(error);

      });
  }

  onCreateOrder(qty: number) {
    const order = new PaymentOrder();
    order.account = this.promotion.account.id;
    order.payment_product = this.promotion.product.id;
    order.quantity = qty;
    order.price = this.promotion.price;
    order.sum = qty * this.promotion.price;
    if (this.postCodes.includes(this.productCode)) {
      order.promoted_post = this.promotion.object.id;
    }

    this.processDialogComponent.show();
    const url = `${'create-payment-order'}`;


    this.service.createItem(url, order)
      .then(res => {
        this.app.appService.newTimestamp();
        this.processDialogComponent.close();
        if (this.productCode === 'post-promotion') {
          this.postPreviewComponent.setPromoted(order.quantity);
          this.paymentProductComponent.closeForm();
        }
        if (this.productCode === 'post-grade') {
          this.postPreviewComponent.setImportance(order.quantity);
        }

        this.calculateBalance(-order.sum);
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Promotion',
          detail: 'Successfully processed'
        });

      })
      .catch(error => {
        this.processDialogComponent.close();
        this.handleError(error);
      });

  }

  onMakePayment(account: number, currency: Currency, sum = 0) {
    const qty = this.paymentProductComponent.getQTY();
    this.paymentDialogComponent.showDialog(account, currency, 0, sum, this.callBackUrl, qty);
  }


  calculateBalance(sum: number) {
    let balance = this.promotion.account.balance;
    balance = +balance + +(sum);
    this.promotion.account.balance = balance;
    this.paymentProductComponent.updateBalance(balance);
  }

  onPaymentCreated(event) {
    const payment = event.payment.sum;
    this.calculateBalance(payment);
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
