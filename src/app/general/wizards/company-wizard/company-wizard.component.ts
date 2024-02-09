import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../../company/company';
import {StandardMessageService} from '../../../standard-message.service';
import {GeneralService} from '../../general.service';


@Component({
  selector: 'app-company-wizard',
  templateUrl: './company-wizard.component.html',
  styleUrls: ['./company-wizard.component.css']
})
export class CompanyWizardComponent implements OnInit {
  @Input() currentUserId: number;
  @Output() canceled = new EventEmitter<void>();
  @Output() msgPushed = new EventEmitter<any>();
  @Output() companyCreated = new EventEmitter<Company>();
  company = new Company();
  save_button_disabled = true;
  company_representative = false;
  show_duplicated_alert = false;



  constructor(
              private service: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {
    this.company.language_code = 'en';
  }

  validate() {

    if (this.company.name) {

       const url = `${'get-companies-by-name/'}${this.company.name}${'/'}${'en'}`;
       this.service.getItems(url)
      .then(res => {

          if (res[0]) {
            this.show_duplicated_alert = true;
          } else {
            this.show_duplicated_alert = false;
          }

        })
        .catch(error => {
          console.log(error);
        });


    }

    this.save_button_disabled = !(this.company.name && this.company_representative);


  }

  createCompany() {
    this.save_button_disabled = true;
     const url = `${'create-company'}`;
     this.service.createItem(url, this.company)
     .then(company => {

        this.companyCreated.emit(company);
        this.save_button_disabled = false;

      })
      .catch(error => {
         this.save_button_disabled = false;
        this.handleError(error);
      });


  }

  onCancel() {
    this.canceled.emit();
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
