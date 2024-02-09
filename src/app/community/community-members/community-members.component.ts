import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Community} from '../community';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';
import {ItemsListAgileComponent} from '../../general/items-list-agile/items-list-agile.component';

@Component({
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.css']
})
export class CommunityMembersComponent implements OnInit {
  @Input() community: Community;
  @Input() currentUserId = 0;
  @Input() isMobile = false;
  @Input() locale = 'en';

  @ViewChild('list') listComponent: ItemsListAgileComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;


  constructor(private sertvice: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {

  }


  removeUser(event) {
    this.processDialogComponent.show();
    const url = `${'delete-community-member/'}${event.value.user_id}${'/'}${this.community.id}${'/'}`;
    this.sertvice.deleteItemByPk(url, null)
      .then(res => {
        this.processDialogComponent.close();


        this.listComponent.deleteItem(event.index);

        this.messageService.addMessage({
          severity: 'success',
          summary: 'User',
          detail: 'Successfully removed'
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
