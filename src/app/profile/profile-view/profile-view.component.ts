import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {Profile, UserWithProfile} from '../profile';
import {ActivatedRoute, Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {AppFilterService} from '../../app-filter.service';
import {MetaService} from '../../meta.service';

import {ProfileOverviewComponent} from './profile-overview/profile-overview.component';
import {ProfilePostsComponent} from './profile-posts/profile-posts.component';
import {ProfileProductsComponent} from './profile-products/profile-products.component';
import {AppConfig} from '../../config/config.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  @ViewChild('overview') overviewComponent: ProfileOverviewComponent;
  @ViewChild('posts') postsComponent: ProfilePostsComponent;
  @ViewChild('products') productsComponent: ProfileProductsComponent;
  defaultReviewTypeId = AppConfig.settings.defaultReviewTypeId;

  isBrowser = false;
  slug: string;
  profile: Profile;
  admin = false;
  currentUserId = 0;

  items: MenuItem[];
  activeTab = 0;
  language = 'en';
  urlLanguage: string;
  userData: UserWithProfile;
  isMobile = false;


  constructor(@Inject(PLATFORM_ID) private platformId: any, private activateRoute: ActivatedRoute,
               private service: GeneralService,
              private deviceService: DeviceDetectorService, private messageService: StandardMessageService,
              public app: AppComponent,
              private metaService: MetaService, private router: Router, private translate: TranslateService,
              @Inject(LOCAL_STORAGE) private localStorage: any, private filterService: AppFilterService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.slug = activateRoute.snapshot.params['slug'];

    const language = activateRoute.snapshot.params['language'];
    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      if (this.isBrowser) {
        this.app.appService.setLanguage();
        this.language = localStorage.getItem('language_code');
      } else {
        this.language = this.metaService.checkLanguage('en');
        this.language = 'en';
      }
    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }


  }

  ngOnInit() {

    if (this.isBrowser) {

      this.currentUserId = +localStorage.getItem('user_id');

    }

    this.activateRoute.params.subscribe(routeParams => {

        this.slug = routeParams.slug;


        this.initData();


    });



  }


  initData(): void {
    this.profile = null;
    const url = `${'get-short-user-profile-by-slug/'}${this.slug}`;
    this.service.getItem(url)
      .then(res => {
        this.userData = new UserWithProfile();
        this.userData.user_profile_default = res;
        this.userData.user_profile = res;
        this.profile = res;

        let imageUrl = null;

        if (this.userData.user_profile_default.img_details) {
          imageUrl = this.userData.user_profile_default.img_details.file_url;
        }

        this.metaService.addMetaTags('user-profile', this.slug,
          this.urlLanguage, this.profile.first_name + ' ' + this.profile.last_name, null, imageUrl, true,
          'article', null, false, null, false);

        this.filterService.initNavigation(7, this.profile.id, 'people');
        this.admin = this.currentUserId === this.profile.user_id;
        this.activeTab = 0;
        if (this.overviewComponent) {
          this.overviewComponent.setProfile(this.profile);
        }

        this.initMenu();

      })
      .catch(error => {
        this.handleError(error);
      });


  }

  initMenu() {
    this.items = [];
    this.translate.get('USERPROFILE.Profile Overview').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 0;

        }

      });

    });

    const total_posts_qty = this.profile.eventsqty.jobposts + this.profile.eventsqty.offerings + this.profile.eventsqty.publications +
      this.profile.eventsqty.requests + this.profile.eventsqty.reviews + this.profile.eventsqty.questions;
    this.translate.get('GENERAL.Timeline').subscribe(res => {
      this.items.push({
        label: res,
        badge: total_posts_qty.toString(),
        command: (event: any) => {
          this.activeTab = 1;

        }
      });

    });

    this.translate.get('PRODUCT.Products').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.profile.eventsqty.products.toString(),
        command: (event: any) => {
          this.activeTab = 2;

        }
      });

    });

    this.translate.get('GENERAL.Reviews & Questions').subscribe(res => {
      this.items.push({
        label: res,
        badge: (this.profile.eventsqty.related_questions + this.profile.eventsqty.related_reviews).toString(),
        command: (event: any) => {
          this.activeTab = 3;

        }
      });

    });


    this.translate.get('GENERAL.Followers').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.profile.eventsqty.followers.toString(),
        command: (event: any) => {
          this.activeTab = 4;

        }
      });

    });

    this.translate.get('USERPROFILE.Following').subscribe(res => {
      this.items.push({
        label: res,
        badge: this.profile.eventsqty.following.toString(),
        command: (event: any) => {
          this.activeTab = 5;

        }
      });

    });

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}

