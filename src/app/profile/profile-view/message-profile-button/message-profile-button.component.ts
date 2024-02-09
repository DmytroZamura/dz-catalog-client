import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../../messaging/messaging';
import {MessagingService} from '../../../messaging/messaging.service';
import {StandardMessageService} from '../../../standard-message.service';

@Component({
  selector: 'app-message-profile-button',
  templateUrl: './message-profile-button.component.html',
  styleUrls: ['./message-profile-button.component.css']
})
export class MessageProfileButtonComponent implements OnInit {

  @Input() currentUserId: number;
  @Input() contactUserId: number;
  @Input() followingStatus: boolean;
  @Output() msgPushed = new EventEmitter<any>();

  constructor(private messagingService: MessagingService, private messageService: StandardMessageService) {
  }

  ngOnInit() {
  }

  onSendMessage(event) {

    this.messagingService.getChatIdForUserContact(this.currentUserId, this.contactUserId)
      .then(res => {

        const message = new Message();
        message.chat = res.chat;
        message.type = 1;
        message.user = this.currentUserId;
        message.message = event;


        this.messagingService.createMessage(message)
          .then(res1 => {


            this.messageService.addMessage({
              severity: 'success',
              summary: 'Message',
              detail: 'Successfully sent'
            });


          })
          .catch(error => {
            console.log(error);
          });

      })
      .catch(error => {
        console.log(error);
      });


  }


  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }

}
