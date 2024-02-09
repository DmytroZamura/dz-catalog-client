import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Community} from './community';
import {ActivatedRoute, Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../meta.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {StandardMessageService} from '../standard-message.service';
import {SignalService} from '../signal.service';
import {Subscription} from 'rxjs';
import {CommunityInvitationsComponent} from './community-invitations/community-invitations.component';
import {AppComponent} from '../app.component';
import {GeneralService} from '../general/general.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  @ViewChild('invitations') invitationsListComponent: CommunityInvitationsComponent;

  private invitationSubscription: Subscription;
  isBrowser = false;
  community_id: number;
  currentUserId = 0;
  language = 'en';
  community: Community;
  items: MenuItem[];
  activeTab = 0;
  isMobile = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,
              private metaService: MetaService, private activateRoute: ActivatedRoute, private router: Router,
              private deviceService: DeviceDetectorService, private messageService: StandardMessageService,
              private signalService: SignalService, public app: AppComponent,
               private service: GeneralService,

              private translate: TranslateService) {
    this.community_id = +activateRoute.snapshot.params['id'];
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {



      this.app.appService.setLanguage();
      this.language = this.translate.currentLang;


    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');


      this.getCommunity();


    }
  }

  ngOnDestroy() {


    if (this.invitationSubscription) {
      this.invitationSubscription.unsubscribe();
      this.invitationSubscription = null;
    }
  }

  updateInvitations(qty: number) {

    this.community.eventsqty.invitations = this.community.eventsqty.invitations + qty;
    if (this.items[4]) {
      this.items[4].badge = this.community.eventsqty.invitations.toString();
    }

  }


  getCommunity() {


    const url = `${'get-community-details/'}${this.community_id}`;
    this.service.getItem(url)
    .then(community => {

        this.community = community;

        this.metaService.addMetaTags('community', null,
          null, this.community.name, null, null, false, null, null);


        this.generateTabs();


        if (this.community.admin_status) {
          this.invitationSubscription = this.signalService.newCommunityInvitation.subscribe(invitation => {
            if (invitation.community === this.community.id) {
              if (this.invitationsListComponent) {
                this.invitationsListComponent.addItem(invitation);
              }
              this.updateInvitations(1);
            }


          });
        }


      })
      .catch(error => {
        this.handleError(error);
      });




  }

  onJoined() {
    this.community.member_status = true;
    this.generateTabs();
  }

  onLeaved() {
    this.community.member_status = false;
    this.generateTabs();
  }



  generateTabs() {

    // this.items = [];

    this.items = [];
    this.translate.get('COMMUNITY.Home').subscribe(res => {
      this.items.push({
        label: res,
        command: (event: any) => {
          this.activeTab = 0;

        }
      });

    });


    if (this.community.member_status) {
      this.translate.get('COMMUNITY.Members').subscribe(label => {
        this.items.push({
          label: label,
          command: (event: any) => {
            this.activeTab = 1;

          }
        });

      });

      if (!this.community.open) {

        this.translate.get('GENERAL.Companies').subscribe(label => {
          this.items.push({
            label: label,
            command: (event: any) => {
              this.activeTab = 2;

            }
          });


        });


        this.translate.get('COMMUNITY.Products').subscribe(label => {
          this.items.push({
            label: label,
            command: (event: any) => {
              this.activeTab = 3;

            }
          });


        });

      }

      if (this.community.admin_status) {
        this.translate.get('COMMUNITY.Requests').subscribe(label => {
          this.items.push({
            label: label,
            badge: this.community.eventsqty.invitations.toString(),
            command: (event: any) => {
              this.activeTab = 4;

            }
          });

        });
      }
    }
  }

  onInvitationProcessed() {
    if (this.community.eventsqty.invitations > 0) {
    this.updateInvitations(-1);
    }
  }

  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
