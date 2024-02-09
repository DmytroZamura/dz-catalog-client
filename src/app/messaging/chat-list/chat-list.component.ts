import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {MessagingService} from '../messaging.service';
import {Chat} from '../messaging';
import {MenuItem, SelectItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs';
import {SignalService} from '../../signal.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AppService} from '../../app.service';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {


  @Input() company_id: number;
  @Input() user_id: number;
  @Input() showFirstChat = true;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() selectedChat = new EventEmitter<any>();
  locale = 'en';
  // count = 0;
  lazyChats: Chat[];
  page = 0;
  selectedIndex: number;
  loading = false;

  keyword = '';
  menu_items: MenuItem[];
  filterValues: SelectItem[];
  requestLabel: string;
  isBrowser = false;
  chatsFinished = false;
  private newMessagesSubscription: Subscription;
  private chatViewedSubscription: Subscription;

  constructor(private messagingService: MessagingService, private translate: TranslateService,
              @Inject(LOCAL_STORAGE) private localStorage: any,
              private signalService: SignalService, private appService: AppService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.locale = this.localStorage.getItem('language_code');
  }

  ngOnInit() {


    this.menu_items = [];

    this.translate.get('MESSAGING.All messages').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {
          this.menuItemSelected(res, 'allMessages');


        }
      });

    });

    this.translate.get('MESSAGING.Unread').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {

          this.menuItemSelected(res, 'unread');


        }
      });

    });


    this.translate.get('GENERAL.Jobs').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {

          this.menuItemSelected(res, 'jobs');

        }
      });

    });

    this.translate.get('GENERAL.Sales').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {
          this.menuItemSelected(res, 'sales');

        }
      });

    });

    this.translate.get('GENERAL.Purchases').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {

          this.menuItemSelected(res, 'purchases');


        }
      });

    });

    this.translate.get('GENERAL.Offering').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {
          this.menuItemSelected(res, 'offering');


        }
      });

    });


    this.translate.get('GENERAL.Requests').subscribe(res => {

      this.menu_items.push({
        label: res,
        command: (event: any) => {
          this.menuItemSelected(res, 'requests');


        }
      });

    });


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
    }

    if (this.chatViewedSubscription) {
      this.chatViewedSubscription.unsubscribe();
    }

  }

  setChatViewed(chatId: number) {
    for (const item of this.lazyChats) {
      if (item.id === chatId) {

        item.unread_messages = 0;


        break;
      }
    }
  }


  checkChatsStatus(chat: Chat) {

    const currentChat = this.appService.getCurrentChatId();
    for (const item of this.lazyChats) {
      if (item.id === chat.id) {
        if (currentChat !== chat.id) {
          item.unread_messages = item.unread_messages + 1;
        }

        break;
      }
    }
  }


  menuItemSelected(label: string, value: string) {

    if (value !== 'allMessages') {
      let exist = false;
      if (!this.filterValues) {
        this.filterValues = [];
      }

      let index = 0;
      for (const filterValue of this.filterValues) {

        if (filterValue.value !== 'unread' && filterValue.value !== value) {
          this.filterValues.splice(index, 1);


        }
        index = index + 1;
        if (filterValue.value === value) {
          exist = true;
        }
      }

      if (!exist) {
        this.filterValues.push({label: label, value: value});
      }

    } else {
      this.filterValues = null;
    }


    this.checkKeywordAndRefreshChats();
  }

  deleteFilteredValue(index: number) {


    this.filterValues.splice(index, 1);

    this.checkKeywordAndRefreshChats();


  }

  @Input() set selectedRole(role) {

    this.onRoleSelected(role);
  }


  onRoleSelected(event) {
    this.lazyChats = [];
    this.selectedIndex = 0;

    if (event.user) {
      this.user_id = event.id;
      this.company_id = null;

    } else {
      this.company_id = event.id;

      this.user_id = null;

    }
    this.checkKeywordAndRefreshChats();
  }


  checkKeywordAndRefreshChats() {
    if (this.keyword) {
      this.keyword = '';
    }

    this.refreshChats();

  }


  formFilter(): string {
    let filter_str = '?';

    if (this.company_id) {
      filter_str = filter_str + '&company=' + this.company_id;
    }

    if (this.user_id) {
      filter_str = filter_str + '&user=' + this.user_id;
    }
    if (this.keyword) {
      filter_str = filter_str + '&keyword=' + this.keyword;
    }

    if (this.filterValues) {
      for (const value of this.filterValues) {

        filter_str = filter_str + '&' + value.value + '=' + 1;
      }
    }


    return filter_str;

  }

  refreshChats() {


    this.page = 0;
    this.chatsFinished = false;
    this.lazyChats = [];
    this.selectedIndex = 0;


    this.loadChatsLazy();


  }


  onScrolled(event) {


    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {

      if (!this.loading && !this.chatsFinished) {
        this.loadChatsLazy();
      }
    }
  }


  loadChatsLazy() {

    if (!this.chatsFinished) {
      this.loading = true;
      this.messagingService.getChats(this.page, this.formFilter())
        .then(res => {


            if (res[0]) {


              this.lazyChats = this.lazyChats.concat(res);

              if (this.page === 0 && this.showFirstChat) {
                res[0].ui_state = 'ui-state-highlight';
                this.selectChat(0);
              }

              if (res[19]) {
                this.page = this.page + 1;
              } else {
                this.chatsFinished = true;
              }
            } else {
              this.chatsFinished = true;
              this.loading = false;
            }
            setTimeout(() => {
              this.loading = false;

            });


          }
        )
        .catch(error => {
          this.loading = false;
          console.log(error);
        });

    }
  }

  selectChat(index: number) {

    if (index !== this.selectedIndex) {
      if (this.selectedIndex >= 0) {

        this.lazyChats[this.selectedIndex].ui_state = '';
      }
      this.lazyChats[index].ui_state = 'ui-state-highlight';
      this.selectedIndex = index;

    }
    const user = !this.company_id;
    let id = this.user_id;
    if (this.company_id) {
      id = this.company_id;
    }

    this.selectedChat.emit({user: user, id: id, chat: this.lazyChats[index].id});

  }

  onSearch(keyword: string) {

    this.keyword = keyword;
    this.filterValues = null;
    this.refreshChats();
  }

}
