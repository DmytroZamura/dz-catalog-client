import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Community, CommunityInvitation, CommunityMember} from '../community';

import {Router} from '@angular/router';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {Subscription} from 'rxjs';
import {SignalService} from '../../signal.service';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-community-buttons',
  templateUrl: './community-buttons.component.html',
  styleUrls: ['./community-buttons.component.css']
})
export class CommunityButtonsComponent implements OnInit, OnDestroy {
  @Input() community: Community;
  @Input() currentUserId: number;
  @Input() showLeaveCommunity = false;
  @Input() buttonsClass = 'flat';
  @Input() joinButtonClass = 'flat';
  @Output() msgPushed = new EventEmitter<any>();
  @Output() leaved = new EventEmitter<void>();
  @Output() joined = new EventEmitter<void>();
  @Output() requestSent = new EventEmitter<void>();
  @Output() requestCanceled = new EventEmitter<void>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  private memberSubscription: Subscription;

  constructor(private service: GeneralService, private messageService: StandardMessageService,
              private router: Router, private signalService: SignalService) {
  }

  ngOnInit() {
    this.checkSubscription();
  }

  ngOnDestroy() {
    if (this.memberSubscription) {
      this.memberSubscription.unsubscribe();
      this.memberSubscription = null;
    }


  }


  checkSubscription() {

    if (this.community.invitation_status === 'pending' && !this.community.member_status) {
      this.memberSubscription = this.signalService.newCommunityMember.subscribe(member => {

        if (this.community.id === member.community && member.user === this.currentUserId) {
          this.community.invitation_status = null;
          this.memberSubscription = null;
          this.community.member_status = true;
        }
      });


      if (!this.community.invitation_status && this.memberSubscription) {
        this.memberSubscription = null;
      }
    }

  }


  sendUserRequest() {
    const invite = new CommunityInvitation();
    invite.user = this.currentUserId;
    invite.community = this.community.id;

    invite.accepted_by_user = true;
    invite.pending = true;
    invite.user_acceptance = false;
    invite.accepted = false;
    invite.company = null;
    invite.message = '';
    this.processDialogComponent.show();

    const url = `${'user-create-community-invitation'}`;

    this.service.createItem(url, invite)
      .then(res => {
        this.processDialogComponent.close();
        this.community.invitation_status = 'pending';
        this.requestSent.emit();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Request',
          detail: 'Successfully sent'
        });
        this.checkSubscription();

      })
      .catch(error => {
        this.processDialogComponent.close();
        this.handleError(error);
      });


  }

  cancelRequest() {
    if (this.community.invitation_status) {
      this.processDialogComponent.show();

      const url = `${'delete-community-invitation-by-user/'}${this.currentUserId}${'/'}`;

      this.service.deleteItemByPk(url, this.community.id)
        .then(res => {
          this.processDialogComponent.close();
          this.community.invitation_status = null;

          this.messageService.addMessage({
            severity: 'info',
            summary: 'Request',
            detail: 'Canceled'
          });

          this.requestCanceled.emit();
          this.checkSubscription();

        })
        .catch(error => {
          this.handleError(error);
          this.processDialogComponent.close();
        });


    }
  }


  onEditCommunity() {
    this.router.navigate(['/manage-community/' + this.community.id]);
  }

  joinCommunity() {
    const member = new CommunityMember();
    member.community = this.community.id;
    member.user = this.currentUserId;
    member.admin = false;
    this.processDialogComponent.show();

    const url = `${'create-community-member'}`;
    this.service.createItem(url, member)
      .then(res => {
        this.processDialogComponent.close();
        this.community.member_status = true;
        this.joined.emit();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Community',
          detail: 'You became a member'
        });


      })
      .catch(error => {
        this.handleError(error);
        this.processDialogComponent.close();
      });

  }


  leaveCommunity() {
    this.processDialogComponent.show();
    const url = `${'delete-community-member/'}${this.currentUserId}${'/'}`;
    this.service.deleteItemByPk(url, this.community.id)
      .then(res => {
        this.processDialogComponent.close();
        this.leaved.emit();
        this.community.member_status = false;
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


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
