import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserEmployment} from '../employment';

import {UserEmploymentService} from '../user-employment.service';
import {CompanyShort} from '../../../company/company';
import {UtilsService} from '../../../utils.service';
import {GLocation} from '../../../general/city';

import {Calendar} from 'primeng/calendar';
import {StandardMessageService} from '../../../standard-message.service';
import {SelectLocationComponent} from '../../../general/select-location/select-location.component';


@Component({
  selector: 'app-edit-user-employment',
  templateUrl: './edit-user-employment.component.html',
  styleUrls: ['./edit-user-employment.component.css']
})
export class EditUserEmploymentComponent implements OnInit {
  @Input() employment: UserEmployment;
  @Input() disabled = false;
  @Input() education = false;
  @Input() language_code;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() employmentDeleted = new EventEmitter<void>();

  @ViewChild('selectEndDate') endDateComponenent: Calendar;
  @ViewChild('location') locationComponent: SelectLocationComponent;

  disabled_save = true;
  startDate: Date;
  endDate: Date;
  currentYear: number;
  maxDate = new Date();

  constructor(private employmentService: UserEmploymentService, private messageService: StandardMessageService) {
  }

  ngOnInit() {
    this.checkCompanyName();


    if (this.employment.start_date) {
      this.startDate = new Date(this.employment.start_date);
    }
    if (this.employment.end_date) {
      this.endDate = new Date(this.employment.end_date);
    }

    this.currentYear = (new Date()).getFullYear();

  }

  ready_to_save() {
    if (this.employment.company || this.employment.company_name) {
      this.disabled_save = false;
    } else {
      this.disabled_save = true;
    }

  }

  onPresentTimeChange() {
    this.ready_to_save();
    if (this.employment.present_time) {
      this.endDate = null;
      this.employment.end_date = null;
    }
  }

  onStartDateSelect(event) {
    this.employment.start_date = UtilsService.convertToServerDate(event);
    this.endDate = null;
    this.employment.end_date = null;
    this.ready_to_save();
  }

  onEndDateSelect(event) {

    if (this.startDate < this.endDate) {
      this.employment.end_date = UtilsService.convertToServerDate(event);

      this.ready_to_save();
    } else {

      this.endDate = this.startDate;
      this.employment.end_date = UtilsService.convertToServerDate(this.startDate.toString());
    }

  }

  onCompanySelect(event) {


    if (event) {
      this.employment.company = event.id;
      this.employment.company_details = event;
      this.employment.company_name = null;


    } else {
      this.employment.company = null;
      this.employment.company_details = null;
      this.employment.company_default_details = null;

      this.employment.company_name = null;
    }
    this.ready_to_save();


  }

  onCompanyNameSelected(event) {


    this.employment.company_name = event;
    this.ready_to_save();


  }


  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.employment.country = location.country.id;
      } else {
        this.employment.country = null;
      }
      this.employment.country_details = location.country;
      if (location.city) {
        this.employment.city = location.city.id;
      } else {
        this.employment.city = null;
      }
      this.employment.city_details = location.city;

      this.ready_to_save();
    }

  }


  saveEmployment() {
    const checkLocation = this.locationComponent.checkLocationName();

    if (checkLocation) {

      if (this.employment.company_name) {
        this.employment.company = null;
      }
      this.employment.language_code = this.language_code;
      if (this.employment.description) {
        this.employment.description = UtilsService.addNowFollow(this.employment.description);
      }
      if (this.employment.id) {

        this.employmentService.updateUserEmployment(this.employment)
          .then(res => {
            this.disabled_save = true;
            this.employment = res;
            this.checkCompanyName();

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Employment',
              detail: 'Successfully updated'
            });


          })
          .catch(error => {
            this.handleError(error);
          });
      } else {
        this.employmentService.createUserEmployment(this.employment)
          .then(res => {
            this.disabled_save = true;
            this.employment = res;
            this.checkCompanyName();

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Employment',
              detail: 'Successfully created'
            });

          })
          .catch(error => {
            this.handleError(error);
          });
      }
    }
  }

  checkCompanyDetails() {
    if (this.employment.company_details) {
      if (!this.employment.company_details.name) {
        this.employment.company_details = this.employment.company_default_details;
      }
    }
  }

  deleteEmploymnets() {

    if (this.employment.id) {
      this.employmentService.deleteUserEmployment(this.employment.id)
        .then(res => {

          this.messageService.addMessage({
            severity: 'success',
            summary: 'Employment',
            detail: 'Successfully deleted'
          });


          this.employmentDeleted.emit();
        })
        .catch(error => {
          this.handleError(error);
        });
    } else {
      this.messageService.addMessage({
        severity: 'success',
        summary: 'Employment',
        detail: 'Successfully deleted'
      });

      this.employmentDeleted.emit();
    }

  }

  checkCompanyName() {
    if (this.employment.company_name && !this.employment.company) {
      this.employment.company_details = new CompanyShort();
      this.employment.company_details.name = this.employment.company_name;
    } else {
      this.checkCompanyDetails();
    }
  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
