import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SupplyRequest, SupplyRequestPosition} from '../../supply-request';
import {Inplace} from 'primeng/inplace';
import {CommonItem} from '../../../general/common-item';
import {SupplyRequestPositionsComponent} from '../../supply-request-positions/supply-request-positions.component';
import {StandardMessageService} from '../../../standard-message.service';
import {SignalService} from '../../../signal.service';
import {Subscription} from 'rxjs';
import {Chat} from '../../../messaging/messaging';
import {AppComponent} from '../../../app.component';
import {AttachedDocument} from '../../../common/attached-documents/attached-document';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {Currency} from '../../../general/currency';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {GeneralService} from '../../../general/general.service';


@Component({
  selector: 'app-supply-request-item',
  templateUrl: './supply-request-item.component.html',
  styleUrls: ['./supply-request-item.component.css'],
  providers: [ConfirmationService]
})
export class SupplyRequestItemComponent implements OnInit, OnDestroy {
  @Input() request: SupplyRequest;
  @Input() userType: string; // - supplier, customer
  @Input() currentUserId = 0;
  @Input() statusesList: CommonItem[];
  @Input() updateMode = false;
  @Input() isMobile = false;
  @Input() locale = 'en';
  @Output() chatSelected = new EventEmitter<number>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  @ViewChild('inplaceComment') inplaceCommentComponent: Inplace;
  @ViewChild('inplaceCurrency') inplaceCurrencyComponent: Inplace;
  @ViewChild('positions') positionsComponent: SupplyRequestPositionsComponent;
  highlightColor = '#f7f7f7';
  truncateNumber = 30;
  readyToSaveComment = false;
  editMode = false;
  editContactsMode = false;
  comment: string;
  chargesComment = '';
  currency: Currency;
  charges = 0;
  skype = '';
  email = '';
  phone = '';
  cancelConfirmationLabel: string;
  cancelMessageLabel: string;
  private newMessagesSubscription: Subscription;
  private chatViewedSubscription: Subscription;
  private requestSubscription: Subscription;

  constructor(private service: GeneralService,
              public app: AppComponent,
              private messageService: StandardMessageService, private signalService: SignalService,
              private translate: TranslateService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {


    this.translate.get('GENERAL.Cancel Confirmation').subscribe(res => {
      this.cancelConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.cancelMessageLabel = res;

    });

    if (this.request.status_details) {
      this.checkEditMode();
    }

    this.newMessagesSubscription = this.signalService.chatUpdate.subscribe(chat => {
      this.checkChatsStatus(chat);
    });

    this.chatViewedSubscription = this.signalService.chatViewed.subscribe(res => {
      this.setChatViewed(res);
    });


    this.requestSubscription = this.signalService.supplyRequestStatusChanged.subscribe(request => {

      this.checkRequestsStatuses(request);

    });


    this.initEditFields();

  }

  checkEditMode() {
    let color = '#f7f7f7';
    let mode = false;
    if (this.userType === 'customer' && this.request.status_details.code === 'new') {
      mode = true;
      color = '#ebe7ef';
    }

    if (this.userType === 'supplier' && this.request.status_details.code === 'posted') {
      mode = true;
    }
    this.highlightColor = color;
    this.editMode = mode;
  }

  ngOnDestroy() {

    if (this.newMessagesSubscription) {
      this.newMessagesSubscription.unsubscribe();
      this.newMessagesSubscription = null;
    }

    if (this.chatViewedSubscription) {
      this.chatViewedSubscription.unsubscribe();
      this.chatViewedSubscription = null;
    }

    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
      this.requestSubscription = null;
    }

  }


  onSaveCustomerComment(comment: string) {
    this.request.customer_comment = comment;
    this.updateSupplyRequest();
  }

  onSaveDeliveryAddress(address: string) {
    this.request.delivery_address = address;
    this.updateSupplyRequest();
  }


  onDocumentsChanged(documents: AttachedDocument[]) {
    this.request.documents = documents;
    this.updateSupplyRequest();
  }


  onCurrencyChange(currency: Currency) {
    this.currency = currency;
    this.inplaceCurrencyComponent.active = false;
    this.updateSupplyRequest();
  }


  setChatViewed(chatId: number) {
    if (this.request.chat_details) {
      if (this.request.chat_details.chat === chatId) {
        this.request.chat_details.chat_details.unread_messages = 0;
      }
    }
  }


  checkChatsStatus(chat: Chat) {
    if (this.request.chat_details) {
      const currentChat = this.app.appService.getCurrentChatId();

      if (this.request.chat_details.chat === chat.id) {
        if (currentChat !== chat.id) {
          this.request.chat_details.chat_details.unread_messages = this.request.chat_details.chat_details.unread_messages + 1;
        }


      }
    }

  }

  checkRequestsStatuses(request: SupplyRequest) {

    if (this.request.id === request.id) {

      this.request = request;
      this.charges = request.charges;
      this.chargesComment = request.charges_comment;


    }

  }


  onChatClick() {
    this.chatSelected.emit(this.request.chat_details.chat);

  }


  onSaveCharges() {

    this.request.charges = this.charges;
    this.calculateTotalAmount();
    this.request.charges_comment = this.chargesComment;

     const url = `${'update-supply-request-charges/'}${this.request.id}`;



     this.service.updateItem(url,  {'value': this.request.charges, 'comment': this.request.charges_comment})
     .then(res => {

        this.inplaceCommentComponent.active = false;
        this.request.need_confirmation = true;
        this.readyToSaveComment = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Comment',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        console.log(error);
      });



  }

  readySaveComment() {
    this.readyToSaveComment = true;
  }

  editContacts() {
    this.editContactsMode = true;
  }


  onCancel() {

    this.inplaceCommentComponent.active = false;
    this.initEditFields();

  }

  calculateTotalAmount() {

    let totalAmount: number;
    totalAmount = 0;
    if (this.request.charges) {
      totalAmount = this.request.charges;
    }

    if (this.request.positions) {

      for (const position of this.request.positions) {

        if (position.total > 0) {
          totalAmount = +(totalAmount) + position.total;
        }

      }

    }
    this.request.total_amount = totalAmount;

  }


  initEditFields() {

    if (this.request.charges) {
      this.charges = this.request.charges;
    } else {
      this.charges = 0;
    }

    if (this.request.charges_comment) {
      this.chargesComment = this.request.charges_comment;
    } else {
      this.chargesComment = '';
    }


    this.skype = this.request.skype;
    this.email = this.request.contact_email;
    this.phone = this.request.contact_phone;
    this.currency = this.request.currency_details;

  }

  onStatusSelected(event: CommonItem) {
    this.updateStatus(event.code);
  }

  cancel() {


    this.confirmationService.confirm({
      message: this.cancelMessageLabel,
      header: this.cancelConfirmationLabel,
      icon: 'fa fa-trash',
      accept: () => {
        if (this.userType === 'supplier') {
          this.updateStatus('canceled');
        } else {
          this.updateStatusByCustomer('c_canceled');
        }

      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });


  }

  updateStatus(code: string) {
    this.processDialogComponent.show();
      const url = `${'update-supply-request-status/'}${this.request.id}`;
      this.service.updateItem(url, {value: code})
     .then(res => {
        this.request = res;
        this.processDialogComponent.close();
        this.checkEditMode();
        if (this.positionsComponent) {
          this.positionsComponent.setEditMode(this.editMode);
        }
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Status',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        console.log(error);
      });



  }

  onEditContacts() {
    if (this.request.status_details.code === 'new' && this.userType === 'customer') {
      this.editContactsMode = true;
    }
  }

  onCancelEditContacts() {
    this.editContactsMode = false;
    this.initEditFields();
  }


  updateSupplyRequest() {
    this.request.skype = this.skype;
    this.request.contact_email = this.email;
    this.request.contact_phone = this.phone;
    this.request.currency = this.currency.id;
     const url = `${'update-supply-request/'}${this.request.id}`;
     this.service.updateItem(url, this.request)
    .then(res => {
        this.request = res;
        // this.processDialogComponent.close();
        this.editContactsMode = false;
        this.checkEditMode();
        if (this.positionsComponent) {
          this.positionsComponent.setEditMode(this.editMode);
        }
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Request',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        console.log(error);
      });


  }

  updateStatusByCustomer(code: string) {
    this.processDialogComponent.show();
      const url = `${'update-supply-request-status-by-customer/'}${this.request.id}`;
      this.service.updateItem(url, {value: code})
    .then(res => {
        this.processDialogComponent.close();
        this.request = res;
        this.checkEditMode();
        if (this.positionsComponent) {
          this.positionsComponent.setEditMode(this.editMode);
        }
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Status',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        console.log(error);
      });


  }

  onPostionsChanged(positions: SupplyRequestPosition[]) {

    this.request.positions = positions;
    this.request.need_confirmation = true;
    this.calculateTotalAmount();
  }


}
