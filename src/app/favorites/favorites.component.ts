import {Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MenuItem, Message} from 'primeng/api';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BrowserService} from '../browser.service';
import {AppComponent} from '../app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Currency} from '../general/currency';
import {GeneralService} from '../general/general.service';
import {AppConfig} from '../config/config.service';
import {SendPostRespondComponent} from '../post/respond/send-post-respond/send-post-respond.component';
import {Post} from '../post/post';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @ViewChild('respond') sendRespondComponent: SendPostRespondComponent;
  isBrowser = false;
  items: MenuItem[];
  activeTab = 0;
  msgs: Message[];
  currentUserId = 0;
  currentCurrency = 1;
  currentCurrencyDetails: Currency;
  isMobile = false;
  language = 'en';
  truncateNumber = 55;
  siteUrl = AppConfig.settings.redirectUri;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private browserService: BrowserService,
              private deviceService: DeviceDetectorService, private service: GeneralService,
              private activateRoute: ActivatedRoute, private translate: TranslateService, public app: AppComponent) {

    this.app.appService.setLanguage();
    this.language = this.translate.currentLang;

    this.isBrowser = browserService.isBrowser;
    this.isMobile = this.deviceService.isMobile();
    const tab = activateRoute.snapshot.params['tab'];
    if (tab && (tab >= 0 && tab <= 4)) {
      this.activeTab = tab;
    }
    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      const current_currency = +localStorage.getItem('currency');

      if (current_currency) {
        this.currentCurrency = current_currency;
      }
    }

    this.items = [];


    this.translate.get('POSTS.Posts').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 0;

        }
      });

    });

    this.translate.get('PRODUCT.Products/Services').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 1;

        }
      });

    });

    this.translate.get('GENERAL.Companies').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 2;

        }
      });

    });

    this.translate.get('COMMUNITY.Communities').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 3;

        }
      });

    });

    this.translate.get('GENERAL.Hashtags').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 4;

        }
      });

    });
  }

  ngOnInit() {
    this.getCurrentCurrencyDetails();
    if (this.isBrowser) {
      if (this.isMobile) {
        this.truncateNumber = 28;
      }


    }
  }


  getCurrentCurrencyDetails() {

    this.service.getCurrency(this.currentCurrency)
      .then(res => {

        this.currentCurrencyDetails = res;


      })
      .catch(error => {
        console.log(error);
      });


  }

  onSendRespond(post: Post, index, feedType) {

    if (this.sendRespondComponent) {
      this.sendRespondComponent.showDialog(post, index, feedType);
    }
  }

  onMsgPushed(event) {
    this.msgs = [];
    this.msgs.push(event);

  }

}
