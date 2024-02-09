import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Community, CommunityInvitation} from '../community';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-community-invitations',
  templateUrl: './community-invitations.component.html',
  styleUrls: ['./community-invitations.component.css']
})
export class CommunityInvitationsComponent implements OnInit {

  @Input() community: Community;
  @Output() invitationProcessed = new EventEmitter<void>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;

  invitations: CommunityInvitation[];

  constructor(private service: GeneralService,
              private messageService: StandardMessageService, public app: AppComponent) {
  }

  ngOnInit() {
    this.getInvitations();
  }

  getInvitations() {

    if (this.community.admin_status) {

       const url = `${'get-community-invitations/'}${this.community.id}`;
       this.service.getItems(url)
      .then(res => {


          this.invitations = res;


        })
        .catch(error => {
          this.handleError(error);
        });


    }
  }

  rejectRequest(index: number) {
    if (this.invitations[index]) {
      this.processDialogComponent.show();
      const url = `${'delete-community-invitation/'}`;
      this.service.deleteItemByPk(url, this.invitations[index].id)
       .then(res => {
          this.processDialogComponent.close();
          this.invitations.splice(index, 1);
          this.invitationProcessed.emit();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Request',
            detail: 'Rejected'
          });


        })
        .catch(error => {
          this.processDialogComponent.close();
          this.handleError(error);
        });

    }
  }

  acceptRequest(index: number) {
    if (this.invitations[index]) {

      this.invitations[index].accepted = true;
      this.processDialogComponent.show();
          const url = `${'update-community-invitation/'}${this.invitations[index].id}`;
          this.service.updateItem(url, this.invitations[index])
      .then(res => {
          this.app.newTimestamp();
          this.processDialogComponent.close();

          this.invitations.splice(index, 1);

          this.invitationProcessed.emit();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Request',
            detail: 'Approved'
          });


        })
        .catch(error => {
          this.processDialogComponent.close();
          this.handleError(error);
        });

    }
  }

  addItem(item: CommunityInvitation) {

    if (!this.invitations) {
      this.invitations = [];
      this.invitations.push(item);
    } else {
      this.invitations.splice(0, 0, item);
    }


  }



  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
