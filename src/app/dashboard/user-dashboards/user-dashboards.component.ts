import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostType} from '../../post/post';
import {CompanyUser} from '../../company/company';
import {GeneralService} from '../../general/general.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-user-dashboards',
  templateUrl: './user-dashboards.component.html',
  styleUrls: ['./user-dashboards.component.css']
})
export class UserDashboardsComponent implements OnInit {
  @Input() userId = 0;
  @Input() locale = 'en';
  @Output() createPost = new EventEmitter<any>();
  userCompanies: CompanyUser[];

  constructor(private service: GeneralService, private messageService: StandardMessageService, public appService: AppService) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserCompanies();


    }
  }

  getUserCompanies() {
    const url = `${'get-user-companies/'}${this.userId}`;
    this.service.getItems(url)
      .then(res => {
        this.userCompanies = res;


      })
      .catch(error => {
        this.handleError(error);
      });

  }

  onCreatePost(event: any) {
    this.createPost.emit(event);
  }

  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
