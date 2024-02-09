import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../messaging';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() isMobile = false;
  @Input() user_id: number;
  @Input() locale = 'en';

  truncateNumber = 60;

  @Output() msgPushed = new EventEmitter<any>();
  fromMe = false;

  constructor() {
  }

  ngOnInit() {


    this.fromMe = this.message.user === this.user_id;
    if (this.isMobile) {
      this.truncateNumber = 20;
    }

  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }

}
