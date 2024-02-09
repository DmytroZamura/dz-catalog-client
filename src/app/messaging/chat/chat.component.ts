import {Component, Input, OnInit, ViewChild, ElementRef, Inject, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {MessagingService} from '../messaging.service';
import {Message} from '../messaging';

import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SignalService} from '../../signal.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {SplitComponent} from 'angular-split';
import {TextEditorComponent} from '../../common/text-editor/text-editor.component';
import {UserImage} from '../../common/file/file';
import {StandardMessageService} from '../../standard-message.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';


@Component({

  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, OnChanges {


  @Input() currentUserId: number;
  @Input() chat_id: number;
  @Input() selectedChat: any;
  @Input() locale: string;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('chatSpliter') private spliter: SplitComponent;
  @ViewChild('textEditor') textEditorComponent: TextEditorComponent;
  private subscription: Subscription;
  count = 0;
  messages: Message[];
  page = 0;
  oldPage: number;


  new_message = '';
  scroll_bottom = false;
  scroll_after_load = false;
  loading = false;
  sendingMessage = false;
  company_id: number;
  user_id: number;
  completedFetching = false;
  lastScrollHeight = 0;
  isMobile = false;
  messageRowsNumber = 6;
  messageSize = 15;
  chatSize = 85;
  expandMore = true;
  dataInitialized = false;


  constructor(private messagingService: MessagingService,
              private messageService: StandardMessageService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private deviceService: DeviceDetectorService, private signalService: SignalService) {
    this.isMobile = this.deviceService.isMobile();

  }


  setLocale() {
    this.locale = this.localStorage.getItem('language_code');
  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.initChat();
    }
  }


  initChat() {

    if (!this.locale) {
      this.setLocale();
    }

    if (this.isMobile) {
      this.messageRowsNumber = 2;
      this.messageSize = 10;
      this.chatSize = 90;

    }
    this.messages = [];

    if (this.chat_id || this.selectedChat) {
      this.loading = true;
      if (this.selectedChat) {
        this.refreshMessages(this.selectedChat);
      } else {
        this.showChat(this.chat_id);
      }

    }


    this.subscription = this.signalService.newMessage.subscribe(res => {

      this.pushMessage(res);

      this.setReadMessages();


    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }


  @Input() set chatID(id: number) {
    this.showChat(id);
  }

  showChat(chat: number) {

    this.setLocale();

    this.messagingService.getYourParticipant(chat)
      .then(result => {

        const selectedChat = {user: result.user, id: result.id, chat: chat};
        this.refreshMessages(selectedChat);

      })
      .catch(error => {

        console.log(error);
      });


  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }


  }


  setReadMessages() {
    if (this.user_id) {


      this.messagingService.setReadMessagesForChatUser(this.chat_id)
        .then(res => {

          this.signalService.refreshUnreadMessages(this.chat_id);

        })
        .catch(error => {
          console.log(error);
        });
    }

    if (this.company_id) {
      this.messagingService.setReadMessagesForChatCompany(this.chat_id, this.company_id)
        .then(res => {

          this.signalService.refreshUnreadMessages(this.chat_id);

        })
        .catch(error => {
          console.log(error);
        });
    }
  }


  onLazyLoad() {

    // console.log('load.....');
    if (!this.loading && !this.completedFetching && this.oldPage >= 0) {


      this.lastScrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
      this.loadMessagesLazy();

    }
  }

  @Input() set currentChat(chat) {

    this.refreshMessages(chat);
  }


  refreshMessages(event) {

    this.new_message = '';

    this.chat_id = event.chat;
    if (event.user) {
      this.user_id = event.id;
      this.company_id = null;
    } else {
      this.user_id = null;
      this.company_id = event.id;
    }


    this.page = 0;
    this.oldPage = null;
    this.scroll_bottom = true;
    this.scroll_after_load = false;
    this.messages = [];


    this.loading = true;

    this.loadMessagesLazy();


  }

  getCurrentChatId(): number {
    return this.chat_id;
  }


  loadMessagesLazy() {
    if (this.page !== this.oldPage) {
      this.loading = true;
      this.oldPage = this.page;
      this.page = this.page + 1;

      this.messagingService.getMessages(this.chat_id, this.oldPage)
        .then(res => {


          if (res.length < 5) {
            this.completedFetching = true;
          }

          if (res[0]) {

            res.sort(function (item1, item2) {
              if (item1.id < item2.id) {
                return -1;
              } else if (item1.id > item2.id) {
                return 1;
              } else {
                return 0;
              }
            });


            this.messages = res.concat(this.messages);

            if (this.page === 1) {
              this.setReadMessages();
              setTimeout(() => {
                this.scrollToBottom();

              });


            } else {
              this.setReadMessages();
              setTimeout(() => {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight - this.lastScrollHeight;

              });

            }

          }
          this.loading = false;

        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }

  }


  onSendMessage() {
    const message = new Message();
    message.chat = this.chat_id;
    message.type = 1;
    message.user = this.currentUserId;
    if (this.company_id) {
      message.company = this.company_id;
    }
    message.message = this.new_message;


    this.sendingMessage = true;

    this.messagingService.createMessage(message)
      .then(res => {

        this.pushMessage(res);
        this.new_message = '';


      })
      .catch(error => {
        this.sendingMessage = false;
        this.handleError(error);
      });
  }


  pushMessage(message: Message) {
    const messages: Array<Message> = [];
    messages.push(message);

    this.sendingMessage = false;
    this.messages = this.messages.concat(messages);

    setTimeout(() => {
      this.scrollToBottom();

    });

    if (message.user === this.currentUserId) {
      this.messageService.addMessage({
        severity: 'success',
        summary: 'Message',
        detail: 'Successfully sent'
      });


    }
  }


  maxMessageSize() {

    const sizes = this.spliter.getVisibleAreaSizes();
    if (sizes[0] >= 50) {
      this.spliter.setVisibleAreaSizes([this.messageSize, this.chatSize]);

    } else {
      this.spliter.setVisibleAreaSizes([this.chatSize, this.messageSize]);

    }

    this.expandMore = sizes[0] <= 50;
  }

  onChangeSizes(event) {


    this.expandMore = event.sizes[0] >= 50;

  }


  onFileUpload(event: UserImage) {
    this.textEditorComponent.addImage({title: event.name, url: event.file_url});

  }


  addEmoji(event: string) {

    this.textEditorComponent.addEmoji(event);


  }


  addGiphy(event) {

    this.textEditorComponent.addImage(event);

  }

  addStickerGiphy(event) {
    this.textEditorComponent.addSticker(event);
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}
