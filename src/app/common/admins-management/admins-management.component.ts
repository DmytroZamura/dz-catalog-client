import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {CompanyUser} from '../../company/company';
import {ProfileShort} from '../../profile/profile';

import {SelectProfileComponent} from '../../profile/select-profile/select-profile.component';

import {ProcessDialogComponent} from '../process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';
import {ItemsListAgileComponent} from '../../general/items-list-agile/items-list-agile.component';


@Component({
  selector: 'app-admins-management',
  templateUrl: './admins-management.component.html',
  styleUrls: ['./admins-management.component.css']
})
export class AdminsManagementComponent implements OnInit {

  @Input() company: number;
  @Input() community: number;
   @Input() currentUserId = 0;
  @Input() isMobile = false;
  @Input() locale = 'en';

  @ViewChild('usersList') listComponent: ItemsListAgileComponent;
  @ViewChild('selectProfile') selectProfile: SelectProfileComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;

  constructor(
              private service: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {
  }

  onProfileSelected(profile: ProfileShort) {

    if (this.company) {
      this.createCompanyUser(profile.user_id);
    }

    if (this.community) {
      this.setCommunityAdminStatus(profile.user_id, 1, null, profile);
    }
  }

  onUserDelete(event) {


    if (this.company) {
      this.processDialogComponent.show();
      const url = `${'company-user-update/'}${this.company}${'/'}${event.value.user_id}${'/'}`;
      this.service.deleteItemByPk(url, null)
        .then(res => {
          this.processDialogComponent.close();
          this.listComponent.deleteItem(event.index);
          this.messageService.addMessage({
            severity: 'success',
            summary: 'User',
            detail: 'Successfully deleted'
          });


        })
        .catch(error => {
          this.processDialogComponent.close();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Permissions',
            detail: 'Permissions denied'
          });
        });


    }

    if (this.community) {
      this.setCommunityAdminStatus(event.value.user_id, 0, event.index, null);
    }

  }

  createCompanyUser(user: number) {

    const companyUser = new CompanyUser();
    companyUser.company = this.company;
    companyUser.user = user;
    companyUser.admin = true;
    companyUser.sales = true;
    companyUser.supply = true;
    this.processDialogComponent.show();
    const url = `${'create-company-user'}`;
    this.service.createItem(url, companyUser)
      .then(res => {
        this.processDialogComponent.close();

        if (res.user_details.user_profile.first_name) {
          this.listComponent.onCreated(res.user_details.user_profile);
        } else {
          this.listComponent.onCreated(res.user_details.user_profile_default);
        }
        this.selectProfile.onClear();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Administrator',
          detail: 'Successfully created'
        });


      })
      .catch(error => {
        this.processDialogComponent.close();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Permissions',
          detail: 'Permissions denied'
        });
      });


  }


  setCommunityAdminStatus(user: number, status: number, index: number, profile: ProfileShort) {


    this.processDialogComponent.show();
    const url = `${'set-community-member-admin-status/'}${this.community}${'/'}${user}`;
    this.service.updateItem(url, {value: status})
      .then(res => {
        this.processDialogComponent.close();
        if (res.value) {
          this.listComponent.onCreated(profile);
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Administrator',
            detail: 'Successfully created'
          });
        } else {
          this.listComponent.deleteItem(index);
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Administrator',
            detail: 'Successfully deleted'
          });
        }


      })
      .catch(error => {
        this.processDialogComponent.close();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Permissions',
          detail: 'Permissions denied'
        });

      });


  }


}
