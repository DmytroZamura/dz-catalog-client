import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../company';
import {ConfirmationService} from 'primeng/api';
import {Language} from '../../../general/language';

import {GeneralService} from '../../../general/general.service';
import {GLocation} from '../../../general/city';
import {Router} from '@angular/router';


import {TextEditorComponent} from '../../../common/text-editor/text-editor.component';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {SelectLocationComponent} from '../../../general/select-location/select-location.component';
import {AppComponent} from '../../../app.component';
import {UtilsService} from '../../../utils.service';

@Component({
  selector: 'app-company-overview-admin',
  templateUrl: './company-overview-admin.component.html',
  styleUrls: ['./company-overview-admin.component.css'],
  providers: [ConfirmationService]
})
export class CompanyOverviewAdminComponent implements OnInit {

  @Input() company: Company;
  @Input() currentUserId: number;
  @ViewChild(TextEditorComponent) editor: TextEditorComponent;
  @ViewChild('deleteDialog') deleteDialogComponent: ProcessDialogComponent;
  @ViewChild('textEditor') textEditorComponent: TextEditorComponent;
  @ViewChild('location') locationComponent: SelectLocationComponent;

  language: Language;
  disabled = false;
  disabled_save = true;
  slug: string;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;


  constructor(private generalService: GeneralService,
              private confirmationService: ConfirmationService, private router: Router, public app: AppComponent,
              private messageService: StandardMessageService, private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    this.slug = this.company.slug;
    this.getLanguageByCode();
  }


  onFileUpload(event) {
    this.company.logo = event.id;
    this.company.logo_details = event;
    this.ready_to_save();
  }

  checkAndSaveCompany() {
    this.company.language_code = this.language.code;
    if (this.company.city_name && this.company.country) {
      this.company.city_name = this.company.city_name.trim();
      this.generalService.getCityByName(this.company.country, this.company.city_name)
        .then(city => {

          if (city.id) {

            this.company.city_name = null;
            this.company.city_details = city;
            this.company.city = city.id;

          } else {
            this.company.city = null;
          }

          this.saveCompany();


        })
        .catch(error => {
          this.handleError(error);
        });


    } else {
      if (this.company.city_name) {
        this.company.city = null;
      }

      this.saveCompany();
    }

  }

  saveCompany() {
    const checkLocation = this.locationComponent.checkLocationName();

    if (checkLocation) {

      if (this.slug !== this.company.slug) {
        const url = `${'check-company-by-slug'}`;
        const filter = `${'?slug='}${this.company.slug}`;
        this.generalService.getItem(url, filter)
          .then(res => {

            if (!res.exists) {
              this.updateCompany();
            } else {
              this.messageService.addMessage({
                severity: 'error',
                summary: 'This URL already exists',
                detail: 'Please enter another value'
              });


            }

          })
          .catch(error => {
            this.handleError(error);
          });


      } else {
        this.updateCompany();
      }

    }
  }


  updateCompany() {
    if (this.company.short_description) {
      this.company.short_description = UtilsService.addNowFollow(this.company.short_description);
    }
    const url = `${'update-company-details/'}${this.company.id}${'/'}${this.language.code}`;
    this.generalService.updateItem(url, this.company)
      .then(res => {
        this.app.newTimestamp();
        this.app.refreshUserRoles();

        if (this.slug !== res.slug) {
          this.router.navigate(['/company-admin/' + res.slug]);
        }
        this.slug = res.slug;
        this.company = res;
        this.disabled_save = true;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Company',
          detail: 'Successfully updated'
        });

      })
      .catch(error => {
        this.handleError(error);
      });

  }

  getLanguageByCode() {


    this.generalService.getLanguageByCode(this.company.language_code)
      .then(lang => {
          this.language = lang;
          this.initDesabled();
        }
      )
      .catch(error => {
        this.handleError(error);
      });


  }


  getCompanyInLanguage(lang: string) {
    const url = `${'get-company-details-in-language/'}${this.company.id}${'/'}${lang}`;
    this.generalService.getItem(url)
    .then(res => {
        this.company = res;
        // this.textEditorComponent.setHtml(res.short_description);
        this.disabled_save = true;

      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onLanguageSelect(event) {
    this.language = event;
    this.initDesabled();
    this.getCompanyInLanguage(event.code);
  }


  deleteCompany() {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {
        this.deleteDialogComponent.show();
            const url = `${'delete-company/'}`;
            this.generalService.deleteItemByPk(url, this.company.id)
        .then(res => {
            this.deleteDialogComponent.close();
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Company',
              detail: 'Successfully deleted'
            });

            this.app.refreshUserRoles();
            this.app.newTimestamp();
            this.router.navigate(['/manage-company/']);

          })
          .catch(error => {
            this.deleteDialogComponent.close();
            this.handleError(error);
          });



      },
      reject: () => {

        this.messageService.addMessage({
          severity: 'info',
          summary: 'Rejected',
          detail: ''
        }, false);


      }
    });


  }


  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.company.country = location.country.id;
      } else {
        this.company.country = null;
      }
      this.company.country_details = location.country;
      if (location.city) {
        this.company.city = location.city.id;
      } else {
        this.company.city = null;
      }
      this.company.city_details = location.city;

      this.ready_to_save();
    }

  }


  onCompanySizeSelect(event) {
    if (event) {
      this.company.company_size = event.id;
      this.company.company_size_details = event;
    } else {
      this.company.company_size = null;
      this.company.company_size_details = null;
    }
    this.ready_to_save();
  }

  onCompanyTypeSelect(event) {
    if (event) {
      this.company.company_type = event.id;
      this.company.company_type_details = event;
    } else {
      this.company.company_type = null;
      this.company.company_type_details = null;
    }

    this.ready_to_save();
  }

  onCompanyIndustrySelect(event) {
    if (event) {
      this.company.company_industry = event.id;
      this.company.company_industry_details = event;
    } else {
      this.company.company_industry = null;
      this.company.company_industry_details = null;
    }
    this.ready_to_save();
  }


  initDesabled() {
    this.disabled = !(this.language.code === 'en');
  }

  ready_to_save() {
    this.disabled_save = false;

  }





  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
