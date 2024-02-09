import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Community, CommunityMember} from '../community';

import {MenuItem} from 'primeng/api';

import {TranslateService} from '@ngx-translate/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-community-admin',
  templateUrl: './community-admin.component.html',
  styleUrls: ['./community-admin.component.css']
})
export class CommunityAdminComponent implements OnInit {
  isBrowser = false;
  community_id: number;
  member: CommunityMember;
  currentUserId = 0;

  community: Community;
  items: MenuItem[];
  activeTab = 0;
  isMobile = false;
  language = 'en';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any, private activateRoute: ActivatedRoute,
              private deviceService: DeviceDetectorService, private messageService: StandardMessageService,
              public app: AppComponent,
              private metaService: MetaService, private router: Router,
              private service: GeneralService,
              private translate: TranslateService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.community_id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {


    this.app.appService.setLanguage();
    this.language = this.translate.currentLang;

    if (this.isBrowser) {
      if (!this.app.appService.isAuthenticated()) {
        this.router.navigate(['/']);
      }
      this.currentUserId = +localStorage.getItem('user_id');

      this.items = [];
      this.translate.get('COMMUNITY.Community Overview').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 0;

          }
        });

      });


      this.translate.get('GENERAL.Users Administration').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 4;

          }
        });

      });


      this.getCommunity();
    }

    this.metaService.addMetaTags('manage-community', null,
      null, null, null, null, false, null, null);

  }


  getCommunity() {
    if (this.currentUserId !== 0) {
      const url = `${'get-community-member-permisions/'}${this.currentUserId}${'/'}${this.community_id}`;
      this.service.getItem(url)
        .then(res => {

          this.member = res;

          if (this.member.admin) {
            const url1 = `${'get-community-details/'}${this.community_id}`;
            this.service.getItem(url1)
              .then(community => {

                this.community = community;
                this.community.current_user_member = true;
                this.community.current_user_admin = true;


              })
              .catch(error => {
                this.handleError(error);
              });

          }


        })
        .catch(error => {
          this.handleError(error);
        });


    }

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
