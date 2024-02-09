import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {ProfileShort} from './profile';

import {MenuItem} from 'primeng/api';

import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';
import {AppFilterService} from '../app-filter.service';
import {MetaService} from '../meta.service';
import {StandardMessageService} from '../standard-message.service';
import {AppComponent} from '../app.component';
import {GeneralService} from '../general/general.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isBrowser = false;



  url: string;
  items: MenuItem[];

  edit_mode = false;
  profile: ProfileShort;
  tabindex = 0;
  activeTab = 0;
  currentUserId = 0;
  language = 'en';
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(LOCAL_STORAGE) private localStorage: any,
              private activateRoute: ActivatedRoute, private service: GeneralService,
              private metaService: MetaService, private translate: TranslateService,
              private messageService: StandardMessageService, public app: AppComponent,  private deviceService: DeviceDetectorService,
                private router: Router, private filterService: AppFilterService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();


    const tab = +activateRoute.snapshot.params['tab'];
    if (tab && (tab >= 0 && tab <= 3)) {
      this.activeTab = tab;
    }

  }

  ngOnInit() {


    this.app.appService.setLanguage();
    this.language = this.translate.currentLang;


    if (this.isBrowser) {
      if (!this.app.appService.isAuthenticated()) {
        this.router.navigate(['/']);
      } else {
        this.currentUserId = +this.localStorage.getItem('user_id');
        this.getShortUserProfile();

        this.items = [];
        this.translate.get('USERPROFILE.Profile Overview').subscribe(res => {
          this.items.push({
            label: res,
            command: (event: any) => {
              this.activeTab = 0;

            }
          });

        });

        this.translate.get('GENERAL.Timeline').subscribe(res => {
          this.items.push({
            label: res,
            command: (event: any) => {
              this.activeTab = 1;

            }
          });

        });

        this.translate.get('USERPROFILE.Products/Services').subscribe(res => {
          this.items.push({
            label: res,
            command: (event: any) => {
              this.activeTab = 2;

            }
          });

        });

      }
    }

    this.metaService.addMetaTags('profile', null,
      null, null, null, null, false, null, null);

  }

  handleChangeTabs(event) {
    this.tabindex = event.index;
  }

  getShortUserProfile(): void {
     const url = `${'get-short-user-profile/'}${this.currentUserId}`;
     this.service.getItem(url)
     .then(res => {

        this.profile = res;
        if (this.activeTab !== 1) {
          this.filterService.initNavigation(7, this.profile.id, 'people');
        }


      })
      .catch(error => {
        this.handleError(error);
      });



  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
