import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ActivatedRoute, Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import {MetaService} from '../meta.service';
import {isPlatformBrowser} from '@angular/common';
import {MenuItem, Message} from 'primeng/api';

import {FilteredPostsListComponent} from '../post/filtered-posts-list/filtered-posts-list.component';
import {Tag, TagQty} from './tag';
import {TagService} from './tag.service';

import {UniversalFilter} from '../common/universal-filter';
import {AppComponent} from '../app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Currency} from '../general/currency';
import {GeneralService} from '../general/general.service';
import {ItemsListAgileComponent} from '../general/items-list-agile/items-list-agile.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  isBrowser = false;
  slug: string;
  items: MenuItem[];
  activeTab = 0;
  msgs: Message[];
  rootPath = 'hashtag';
  language = 'en';
  urlLanguage: string;
  tag: Tag;
  currentUserId = 0;
  currentCurrency = 1;
  appliedFilter = new UniversalFilter();
  isMobile = false;
  currentCurrencyDetails: Currency;

  @ViewChild('list') listComponent: FilteredPostsListComponent;
  @ViewChild('productslist') productsListComponent: ItemsListAgileComponent;
  @ViewChild('companieslist') companiesListComponent: ItemsListAgileComponent;
  @ViewChild('userslist') usersListComponent: ItemsListAgileComponent;
  @ViewChild('communitieslist') communitiesListComponent: ItemsListAgileComponent;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any, private activateRoute: ActivatedRoute,
              private router: Router, public app: AppComponent, private deviceService: DeviceDetectorService, private service: GeneralService,
              private translate: TranslateService, private metaService: MetaService, private tagService: TagService) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    const language = activateRoute.snapshot.params['language'];
    this.slug = activateRoute.snapshot.params['slug'];
    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      this.app.appService.setLanguage();
      this.language = localStorage.getItem('language_code');
      this.router.navigate(['/hashtag/' + this.slug + '/' + this.language]);
    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }


    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      const current_currency = +localStorage.getItem('currency');

      if (current_currency) {
        this.currentCurrency = current_currency;
      }
    }


  }

  ngOnInit() {
    // this.setMeta();
    this.getCurrentCurrencyDetails();
    this.activateRoute.params.subscribe(routeParams => {

      if ((this.slug !== routeParams.slug) || !this.tag) {
        this.slug = routeParams.slug;
        this.initData();
        if (this.activeTab === 0) {

          if (this.listComponent) {
            this.listComponent.onTagChanged(this.slug);
          }
        }

        if (this.activeTab === 1) {

          this.productsListComponent.setTag(this.slug);
        }

        if (this.activeTab === 2) {

          this.companiesListComponent.setTag(this.slug);
        }

        if (this.activeTab === 3) {

          this.usersListComponent.setTag(this.slug);
        }

        if (this.activeTab === 4) {

          this.communitiesListComponent.setTag(this.slug);
        }
      }

    });


  }


  initMenu() {
    this.items = [];


    this.translate.get('GENERAL.Timeline').subscribe(res => {
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

    this.translate.get('GENERAL.People').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 3;

        }
      });

    });

    this.translate.get('COMMUNITY.Communities').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 4;

        }
      });

    });
  }

  setMeta() {


    this.metaService.addMetaTags(this.rootPath, this.slug,
      this.urlLanguage, this.slug, null, null, true, null, null);
  }


  initData(): void {
    this.tagService.getTagBySlug(this.slug)
      .then(res => {
        this.setMeta();

        if (!res.qty) {
          const qty = new TagQty();
          qty.followers = 0;
          res.qty = qty;

        }
        this.tag = res;

        this.initMenu();


      })
      .catch(error => {
        console.log(error);
        this.initMenu();
      });

  }

  onFollowStatusChanged(followStatus: boolean) {
    this.tag.follow_status = followStatus;
    if (followStatus) {
      this.tag.qty.followers = this.tag.qty.followers + 1;
    } else {
      this.tag.qty.followers = this.tag.qty.followers - 1;
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

  onMsgPushed(event) {
    this.msgs = [];
    this.msgs.push(event);

  }


}
