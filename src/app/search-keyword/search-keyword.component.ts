import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {FilteredPostsListComponent} from '../post/filtered-posts-list/filtered-posts-list.component';

import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MetaService} from '../meta.service';
import {isPlatformBrowser} from '@angular/common';
import {AppComponent} from '../app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {GeneralService} from '../general/general.service';
import {Currency} from '../general/currency';
import {AppConfig} from '../config/config.service';
import {ItemsListAgileComponent} from '../general/items-list-agile/items-list-agile.component';

@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.css']
})
export class SearchKeywordComponent implements OnInit {
  @ViewChild('list') listComponent: FilteredPostsListComponent;
  @ViewChild('productslist') productslListComponent: ItemsListAgileComponent;
  @ViewChild('companieslist') companieslListComponent: ItemsListAgileComponent;
  @ViewChild('userslist') userslListComponent: ItemsListAgileComponent;
  @ViewChild('communitieslist') communitieslistComponent: ItemsListAgileComponent;
  @ViewChild('tagslist') tagslistComponent: ItemsListAgileComponent;

  isBrowser = false;
  slug: string;
  items: MenuItem[];
  activeTab = 0;

  rootPath = 'keyword';
  currentUserId = 0;
  currentCurrency = 1;
  currentCurrencyDetails: Currency;
  isMobile = false;
  language = 'en';
  siteUrl = AppConfig.settings.redirectUri;




  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,
              private activateRoute: ActivatedRoute, public app: AppComponent, private deviceService: DeviceDetectorService,
              private router: Router, private translate: TranslateService, private metaService: MetaService,
              private service: GeneralService) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.slug = activateRoute.snapshot.params['slug'];

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      const current_currency = +localStorage.getItem('currency');

      if (current_currency) {
        this.currentCurrency = current_currency;
      }
    }


  }

  ngOnInit() {


    this.app.appService.setLanguage();
     this.language = this.translate.currentLang;


    this.getCurrentCurrencyDetails();

    this.setMeta();

    this.activateRoute.params.subscribe(routeParams => {
      if (this.slug !== routeParams.slug) {
        this.slug = routeParams.slug;
        if (this.activeTab === 0) {

          this.listComponent.onSearchChanged(this.slug);
        }

        if (this.activeTab === 1) {

          this.productslListComponent.setKeyword(this.slug);
        }

        if (this.activeTab === 2) {

          this.companieslListComponent.setKeyword(this.slug);
        }

        if (this.activeTab === 3) {

          this.userslListComponent.setKeyword(this.slug);
        }

        if (this.activeTab === 4) {

          this.communitieslistComponent.setKeyword(this.slug);
        }


        if (this.activeTab === 5) {

          this.tagslistComponent.setKeyword(this.slug);
        }


      }
    });

    if (this.isBrowser) {
      this.initMenu();
    }

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

    this.translate.get('GENERAL.Hashtags').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 5;

        }
      });

    });
  }

  setMeta() {


    this.metaService.addMetaTags(this.rootPath, this.slug,
      null, this.slug, null, null, true, null, null);
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


}
