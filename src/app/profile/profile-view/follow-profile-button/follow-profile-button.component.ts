import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {UserProfileFollower} from '../../profile';
import {StandardMessageService} from '../../../standard-message.service';
import {AppComponent} from '../../../app.component';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-follow-profile-button',
  templateUrl: './follow-profile-button.component.html',
  styleUrls: ['./follow-profile-button.component.css']
})
export class FollowProfileButtonComponent implements OnInit {
  @Input() profileId: number;
  @Input() userId: number;
  @Input() followStatus: boolean;
  @Input() followIcon = 'pi pi-plus';
  @Input() followingIcon = 'pi pi-check';
  @Output() itemClicked = new EventEmitter<void>();
  loading = false;

  constructor(private generalService: GeneralService, private messageService: StandardMessageService, public app: AppComponent) {
  }

  ngOnInit() {
  }


  followProfile() {
      this.itemClicked.emit();
     if (this.app.appService.isAuthenticated()) {
       const new_follower = new UserProfileFollower();
       new_follower.profile = this.profileId;
       new_follower.user = this.userId;
       this.loading = true;

       this.generalService.createItem('follow-profile', new_follower) .then(res => {
           this.app.newTimestamp();
           this.followStatus = true;
           this.loading = false;

           this.messageService.addMessage({
             severity: 'success',
             summary: 'User',
             detail: 'You follow'
           });


         })
         .catch(error => {
           console.log(error);
         });

       // this.profileService.followProfile(new_follower)
       //   .then(res => {
       //     this.app.newTimestamp();
       //     this.followStatus = true;
       //     this.loading = false;
       //
       //     this.messageService.addMessage({
       //       severity: 'success',
       //       summary: 'User',
       //       detail: 'You follow'
       //     });
       //
       //
       //   })
       //   .catch(error => {
       //     console.log(error);
       //   });
     } else {
       this.app.appService.showAuthDialog = true;
     }
  }

  unfollowProfile() {
    this.loading = true;

     const endpoint = `${'unfollow-profile/'}${this.userId}${'/'}${this.profileId}${'/'}`;
     this.generalService.deleteItemByPk(endpoint, null)
    .then(res => {
        this.app.newTimestamp();
        this.followStatus = false;
        this.loading = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'User',
          detail: 'You unfollowed'
        });


      })
      .catch(error => {
        console.log(error);
      });

    // this.profileService.unfollowProfile(this.userId, this.profileId)
    //   .then(res => {
    //     this.app.newTimestamp();
    //     this.followStatus = false;
    //     this.loading = false;
    //     this.messageService.addMessage({
    //       severity: 'success',
    //       summary: 'User',
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
