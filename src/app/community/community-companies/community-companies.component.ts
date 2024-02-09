import {Component, Input, OnInit,  ViewChild} from '@angular/core';
import {Community} from '../community';

import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';

import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';
import {ItemsListAgileComponent} from '../../general/items-list-agile/items-list-agile.component';

@Component({
  selector: 'app-community-companies',
  templateUrl: './community-companies.component.html',
  styleUrls: ['./community-companies.component.css']
})
export class CommunityCompaniesComponent implements OnInit {

  @Input() community: Community;
  @Input() currentUserId = 0;
  @Input() locale = 'en';

  @ViewChild('list') listComponent: ItemsListAgileComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;


  constructor(
              private service: GeneralService,
              private messageService: StandardMessageService, public app: AppComponent) {
  }

  ngOnInit() {

  }

  removeCompany(event) {
    this.processDialogComponent.show();
     const url = `${'delete-community-company/'}${event.value.id}${'/'}${this.community.id}${'/'}`;

     this.service.deleteItemByPk(url, null)
    .then(res => {
        this.app.newTimestamp();
        this.processDialogComponent.close();
        this.listComponent.deleteItem(event.index);

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Company',
          detail: 'Successfully deleted'
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
