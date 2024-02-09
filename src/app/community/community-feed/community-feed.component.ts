import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Community, CommunityInvitation} from '../community';
import {Router} from '@angular/router';
import {AppFilterService} from '../../app-filter.service';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {BrowserService} from '../../browser.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {FilteredPostsListComponent} from '../../post/filtered-posts-list/filtered-posts-list.component';
import {Post} from '../../post/post';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.css']
})
export class CommunityFeedComponent implements OnInit {


  @Input() community: Community;


  @Output() leaved = new EventEmitter<void>();
  @Output() joined = new EventEmitter<void>();
  @ViewChild('list') listComponent: FilteredPostsListComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  isBrowser = false;
  currentUserId = 0;
  // invitation: CommunityInvitation;
  menu_items: MenuItem[];
  add_you_company_label: string;
  leave_community_label: string;
  actions_label: string;
  cancel_company_request_label: string;
  leave_company_label: string;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private browserService: BrowserService, private router: Router,
              private service: GeneralService,
              public app: AppComponent,
              private messageService: StandardMessageService,
              private filterService: AppFilterService, public translate: TranslateService) {
    this.isBrowser = browserService.isBrowser;
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');


      this.translate.get('COMMUNITY.Request for your company').subscribe(res => {
          this.add_you_company_label = res;
          this.translate.get('COMMUNITY.Leave the community').subscribe(res1 => {
              this.leave_community_label = res1;
              this.translate.get('BUTTONS.Actions').subscribe(res2 => {
                  this.actions_label = res2;
                  this.translate.get('COMMUNITY.Cancel company request').subscribe(res3 => {
                      this.cancel_company_request_label = res3;
                      this.translate.get('COMMUNITY.A company leaves the community').subscribe(res4 => {
                          this.leave_company_label = res4;
                          this.generateButtonMenuItems();
                        }
                      );
                    }
                  );
                }
              );
            }
          );


        }
      );


    }

  }

  onPostCreated(post: Post) {
    this.listComponent.onPostCreated(post);
  }

  generateButtonMenuItems() {


    this.menu_items = [];
    if (!this.community.open) {
      const url = `${'get-adminuser-companies-not-in-community/'}${this.currentUserId}${'/'}${this.community.id}`;
      this.service.getItems(url)
        .then(res => {

          let menuItems: MenuItem[];
          menuItems = [];
          if (res[0]) {


            for (const obj of res) {

              menuItems.push({
                label: obj.company_details.name,
                command: (event: any) => {
                  this.createCompanyRequest(obj.company);

                }
              });


            }
            this.menu_items.push({label: this.add_you_company_label, items: menuItems});
          }

          const url1 = `${'get-adminuser-companies-in-community-invitations/'}${this.currentUserId}${'/'}${this.community.id}`;
          this.service.getItems(url1)
            .then(res2 => {

              let menuItems1: MenuItem[];
              menuItems1 = [];
              if (res2[0]) {


                // this.menu_items[item_index].items = [];

                for (const obj of res2) {


                  let label: string;
                  if (obj.company_details.name) {
                    label = obj.company_details.name;
                  } else {
                    label = obj.company_default_details.name;
                  }
                  menuItems1.push({
                    label: label,
                    command: (event: any) => {
                      this.cancelCompanyRequest(obj.id);

                    }
                  });


                }
                this.menu_items.push({label: this.cancel_company_request_label + ':', items: menuItems1});
              }


            })
            .catch(error => {
              this.handleError(error);
            });


        })
        .catch(error => {
          this.handleError(error);
        });


      const url3 = `${'get-adminuser-companies-in-community/'}${this.currentUserId}${'/'}${this.community.id}`;
      this.service.getItems(url3)
        .then(res4 => {

          let menuItems2: MenuItem[];
          menuItems2 = [];
          if (res4[0]) {


            // this.menu_items[item_index].items = [];

            for (const obj of res4) {

              menuItems2.push({
                label: obj.company_details.name,
                command: (event: any) => {
                  this.leaveCompanyCommunity(obj.company);

                }
              });


            }
            this.menu_items.push({label: this.leave_company_label + ':', items: menuItems2});
          }


        })
        .catch(error => {
          this.handleError(error);
        });


    }
    const items = [];
    if (!this.community.admin_status) {

      items.push({
        label: this.leave_community_label,
        icon: 'pi pi-sign-out',
        command: (event: any) => {
          this.leaveCommunity();

        }
      });
    }

    if (items[0]) {
      this.menu_items.push({label: this.actions_label + ':', items: items});
    }

  }


  createCompanyRequest(company: number) {

    const invite = new CommunityInvitation();
    invite.user = this.currentUserId;
    invite.community = this.community.id;
    invite.accepted_by_user = true;
    invite.pending = true;
    invite.user_acceptance = false;
    invite.company = company;
    invite.accepted = false;
    invite.message = '';
    this.processDialogComponent.show();
    const url = `${'user-create-community-invitation'}`;
    this.service.createItem(url, invite)
      .then(res => {
        this.processDialogComponent.close();


        this.generateButtonMenuItems();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Request',
          detail: 'Successfully sent'
        });


      })
      .catch(error => {
        this.processDialogComponent.close();
        this.handleError(error);
      });


  }

  cancelCompanyRequest(invitation: number) {
    if (invitation) {
      this.processDialogComponent.show();
      const url = `${'delete-community-invitation/'}`;
      this.service.deleteItemByPk(url, invitation)
        .then(res => {
          this.processDialogComponent.close();


          this.generateButtonMenuItems();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Membership',
            detail: 'Canceled'
          });

        })
        .catch(error => {
          this.processDialogComponent.close();
          this.handleError(error);
        });

    }
  }


  joinCommunity() {

    this.community.member_status = true;
    this.joined.emit();
    this.filterService.showPosts(true);

    this.generateButtonMenuItems();


  }


  leaveCommunity() {

    this.processDialogComponent.show();
    const url = `${'delete-community-member/'}${this.currentUserId}${'/'}${this.community.id}${'/'}`;
    this.service.deleteItemByPk(url, null)
      .then(res => {
        this.processDialogComponent.close();
        this.leaved.emit();
        this.community.member_status = false;
        this.filterService.showPosts(false);
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Community',
          detail: 'You out'
        });

      })
      .catch(error => {
        this.processDialogComponent.close();
        this.handleError(error);
      });

  }

  leaveCompanyCommunity(company: number) {

    this.processDialogComponent.show();
    const url = `${'get-community-company/'}${this.community.id}${'/'}${company}${'/'}`;
    this.service.getItem(url)
      .then(com_company => {
        this.processDialogComponent.close();

        if (com_company) {
          const url2 = `${'leave-company-community/'}`;
          this.service.deleteItemByPk(url2, com_company.id)
            .then(res => {
              this.app.newTimestamp();

              this.generateButtonMenuItems();
              this.messageService.addMessage({
                severity: 'success',
                summary: 'Community',
                detail: 'You out'
              });


            })
            .catch(error => {
              this.processDialogComponent.close();
              this.handleError(error);
            });


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
