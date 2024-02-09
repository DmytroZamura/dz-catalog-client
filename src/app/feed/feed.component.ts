import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Category} from '../category/category';
import {MetaService} from '../meta.service';
import {ActivatedRoute, Router} from '@angular/router';

import {CompanyUser} from '../company/company';

import {AppFilterService} from '../app-filter.service';
import {FilteredPostsListComponent} from '../post/filtered-posts-list/filtered-posts-list.component';
import {StandardMessageService} from '../standard-message.service';
import {UniversalFilter} from '../common/universal-filter';

import {SignalService} from '../signal.service';
import {AppComponent} from '../app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {GeneralService} from '../general/general.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @ViewChild('list') listComponent: FilteredPostsListComponent;
  isBrowser = false;
  country_id: number;
  city_id: number;
  currentUserId = 0;
  active_index = 0;
  category: Category;
  language = 'en';
  urlLanguage: string;

  paramsChecked = false;
  appliedFilter: UniversalFilter;
  showContent = true;
  isMobile = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(LOCAL_STORAGE) private localStorage: any,
              private metaService: MetaService, private activateRoute: ActivatedRoute, private router: Router,
              private messageService: StandardMessageService, private signalService: SignalService, public app: AppComponent,
              private service: GeneralService, private translate: TranslateService,
              private filterService: AppFilterService, private deviceService: DeviceDetectorService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();

    const language = activateRoute.snapshot.params['language'];


    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      this.app.appService.setLanguage();
      this.language = this.translate.currentLang;
    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }

    this.currentUserId = +localStorage.getItem('user_id');


    if (this.currentUserId !== 0) {
      this.active_index = 1;
    }

    const params = activateRoute.snapshot.queryParams;
    this.getUniversalFilter(params);


  }


  ngOnInit() {

    if (this.isBrowser) {
      setTimeout(() => {

        this.app.appService.checkWelcomeMessage();

      }, 2500);
    }
  }

  focusPostEvent() {
    this.app.appService.showAuthDialog = true;
  }

  getUniversalFilter(params: any) {

    const url = `${'get-universal-filter/'}${JSON.stringify(params)}${'/'}${this.language}`;
    this.service.getItem(url)
      .then(res => {

        if (this.router.url === '/') {
          this.showContent = this.isBrowser;
          this.metaService.addMetaTags('/', null,
            this.urlLanguage, null, null, null, false, null, null);
        } else {
          this.metaService.addMetaTags('feed', null,
            this.urlLanguage, null, null, null, true, null, res);
        }

        if (res) {
          // if (this.isBrowser) {
          //   this.filterService.initNavigation(1, null, 'feed', false, res);
          //
          // }
          this.appliedFilter = res;
          this.paramsChecked = true;
        }


      })
      .catch(error => {
        console.log(error);
      });


  }


  onCategorySelect(event) {


    this.category = event;
  }


  onCreatePost(event) {


    this.app.showPostDialog(event.type, event.company);

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
