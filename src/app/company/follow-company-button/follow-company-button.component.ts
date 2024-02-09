import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyFollower} from '../company';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';

import {AppService} from '../../app.service';

@Component({
  selector: 'app-follow-company-button',
  templateUrl: './follow-company-button.component.html',
  styleUrls: ['./follow-company-button.component.css']
})
export class FollowCompanyButtonComponent implements OnInit {
  @Input() company_id: number;
  @Input() user_id: number;
  @Input() follow_status: boolean;
  loading = false;

  @Output() itemClicked = new EventEmitter<void>();


  constructor( private generalService: GeneralService, private appService: AppService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {

  }


  followCompany() {
    this.itemClicked.emit();
    if (this.appService.isAuthenticated()) {

      const new_follower = new CompanyFollower();
      new_follower.company = this.company_id;
      new_follower.user = this.user_id;
      this.loading = true;

      this.generalService.createItem('follow-company/', new_follower)
       .then(res => {
          this.appService.newTimestamp();
          this.follow_status = true;
          this.loading = false;
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Company',
            detail: 'You follow'
          });


        })
        .catch(error => {
          console.log(error);
        });


      // this.companyService.followCompany(new_follower)
      //   .then(res => {
      //     this.app.newTimestamp();
      //     this.follow_status = true;
      //     this.loading = false;
      //     this.messageService.addMessage({
      //       severity: 'success',
      //       summary: 'Company',
      //       detail: 'You follow'
      //     });
      //
      //
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    } else {
      this.appService.showAuthDialog = true;
    }
  }

  unfollowCompany() {
    this.loading = true;
    const endpoint = `${'unfollow-company/'}${this.user_id}${'/'}${this.company_id}${'/'}`;
    this.generalService.deleteItemByPk(endpoint, null)
      .then(res => {
        this.loading = false;
        this.follow_status = false;
        this.appService.newTimestamp();
        this.messageService.addMessage({
          severity: 'info',
          summary: 'Company',
          detail: 'You unfollowed'
        });


      })
      .catch(error => {
        console.log(error);
      });


    // this.companyService.unfollowCompany(this.user_id, this.company_id)
    //   .then(res => {
    //     this.loading = false;
    //     this.follow_status = false;
    //     this.app.newTimestamp();
    //     this.messageService.addMessage({
    //       severity: 'info',
    //       summary: 'Company',
    //       detail: 'You unfollowed'
    //     });
    //
    //
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }


}
