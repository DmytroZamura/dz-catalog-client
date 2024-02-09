import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonItem} from '../../../../../general/common-item';
import {PostRespond} from '../../../post-respond';
import {StandardMessageService} from '../../../../../standard-message.service';
import {Subscription} from 'rxjs';
import {SignalService} from '../../../../../signal.service';
import {Chat} from '../../../../../messaging/messaging';
import {AppComponent} from '../../../../../app.component';
import {GeneralService} from '../../../../../general/general.service';

@Component({
  selector: 'app-post-respond',
  templateUrl: './post-respond.component.html',
  styleUrls: ['./post-respond.component.css']
})
export class PostRespondComponent implements OnInit, OnDestroy {
  @Input() respond: PostRespond;
  @Input() statusesList: CommonItem[];
  @Input() postType: string;
  @Input() userType: string; // -  owner, responder
  @Input() currentUserId = 0;
  @Input() locale = 'en';
  @Output() chatSelected = new EventEmitter<number>();
  @Output() newMinus = new EventEmitter<void>();
  @Output() msgPushed = new EventEmitter<any>();
  private newMessagesSubscription: Subscription;
  private chatViewedSubscription: Subscription;
  truncateNumber = 30;


  constructor(private service: GeneralService, public app: AppComponent,
              private messageService: StandardMessageService, private signalService: SignalService) {
  }

  ngOnInit() {
    this.checkCompanyDetails();
    this.newMessagesSubscription = this.signalService.chatUpdate.subscribe(chat => {
      this.checkChatsStatus(chat);
    });

    this.chatViewedSubscription = this.signalService.chatViewed.subscribe(res => {
      this.setChatViewed(res);
    });

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


  }

  setChatViewed(chatId: number) {
    if (this.respond.chat_details) {


      if (this.respond.chat_details.chat === chatId) {
        this.respond.chat_details.chat_details.unread_messages = 0;
      }
    }
  }


  checkChatsStatus(chat: Chat) {
    if (this.respond.chat_details) {
      const currentChat = this.app.appService.getCurrentChatId();

      if (this.respond.chat_details.chat === chat.id) {
        if (currentChat !== chat.id) {
          this.respond.chat_details.chat_details.unread_messages = this.respond.chat_details.chat_details.unread_messages + 1;
        }


      }
    }

  }


  checkCompanyDetails() {
    if (this.respond.company_details) {
      if (!this.respond.company_details.name) {
        this.respond.company_details = this.respond.company_default_details;
      }
    }

    if (this.respond.post_details.company_details) {
      if (!this.respond.post_details.company_details.name) {
        this.respond.post_details.company_details = this.respond.post_details.company_default_details;
      }
    }

  }

  onChatClick() {
    this.chatSelected.emit(this.respond.chat_details.chat);

  }

  onSaveComment(text: string) {
    this.respond.comment = text;

    if (this.postType === 'job') {

      const url = `${'update-applicant-comment/'}${this.respond.id}`;
      this.service.updateItem(url, {value: this.respond.comment})
        .then(res => {


          this.messageService.addMessage({
            severity: 'success',
            summary: 'Comment',
            detail: 'Successfully updated'
          });


        })
        .catch(error => {
          console.log(error);
        });


    } else {
      const url = `${'update-post-respond-comment/'}${this.respond.id}`;
      this.service.updateItem(url, {value: this.respond.comment})
        .then(res => {

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

  }


  updateRating() {
    if (this.postType === 'job') {
      const url = `${'set-applicant-rating/'}${this.respond.id}`;
      this.service.updateItem(url, {'value': this.respond.rating})
        .then(res => {
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Rating',
            detail: 'Successfully updated'
          });
        })
        .catch(error => {
          console.log(error);
        });

    } else {
      const url = `${'set-post-respond-rating/'}${this.respond.id}`;
      this.service.updateItem(url, {'value': this.respond.rating})
        .then(res => {


          this.messageService.addMessage({
            severity: 'success',
            summary: 'Rating',
            detail: 'Successfully updated'
          });

        })
        .catch(error => {
          console.log(error);
        });


    }

  }

  onStatusSelected(event: CommonItem) {


    this.updateStatus(event);
  }


  setStatus(status: CommonItem) {

    if (!this.respond.reviewed) {
      if (this.respond.status_details.code === 'new' && status.code !== 'new') {
        this.newMinus.emit();
        this.respond.reviewed = true;
      }
    }


    this.respond.status = status.id;
    this.respond.status_details = status;
  }

  updateStatus(status: CommonItem) {
    if (this.postType === 'job') {
      const url = `${'update-applicant-status/'}${this.respond.id}`;
      this.service.updateItem(url, {'value': status.id})
        .then(res => {
          this.setStatus(status);
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Status',
            detail: 'Successfully updated'
          });


        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const url = `${'update-post-respond-status/'}${this.respond.id}`;
      this.service.updateItem(url, {'value': status.id})
        .then(res => {
          this.setStatus(status);
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
  }


}
