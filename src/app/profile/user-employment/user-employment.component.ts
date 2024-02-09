import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {UserEmploymentService} from './user-employment.service';
import {UserEmployment} from './employment';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-user-employment',
  templateUrl: './user-employment.component.html',
  styleUrls: ['./user-employment.component.css']
})
export class UserEmploymentComponent implements OnInit {

  @Input() profile: number;
  @Input() edit_mode: true;
  @Input() language_code: string;
  @Input() disabled = false;
  @Input() education = false;
  @Input() currentUserId = 0;
  @Output() msgPushed = new EventEmitter<any>();

  employments: UserEmployment[];

  constructor(private employmentService: UserEmploymentService, private messageService: StandardMessageService) {
  }

  ngOnInit() {

    this.getUserEmployments();
  }

  getUserEmployments() {
    this.employmentService.getUserEmployments(this.profile, this.education, this.language_code)
      .then(res => {

        let i = 0;
        for (const item of res) {

          if (item.company_details) {
            if (!item.company_details.name) {
              res[i].company_details = res[i].company_default_details;
            }
          }

          i = i + 1;

        }
        this.employments = res;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  refreshEmploymnets(language_code) {
    this.language_code = language_code;
    this.getUserEmployments();
  }

  addEmploymnet() {
    const object = new UserEmployment();
    object.language_code = this.language_code;
    object.profile = this.profile;
    object.education = this.education;

    if (!this.employments) {
      this.employments = [];
    }
    this.employments.splice(0, 0, object);


  }

  onEmploymentDeleted(index: number) {
    this.employments.splice(index, 1);
  }


  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);
  }


}


