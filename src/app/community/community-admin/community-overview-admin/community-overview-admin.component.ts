import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Community} from '../../community';
import {Language} from '../../../general/language';
import {ConfirmationService} from 'primeng/api';
import {GeneralService} from '../../../general/general.service';
import {Router} from '@angular/router';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {SelectLocationComponent} from '../../../general/select-location/select-location.component';
import {GLocation} from '../../../general/city';

@Component({
  selector: 'app-community-overview-admin',
  templateUrl: './community-overview-admin.component.html',
  styleUrls: ['./community-overview-admin.component.css'],
  providers: [ConfirmationService]
})
export class CommunityOverviewAdminComponent implements OnInit {
  @Input() community: Community;

  @ViewChild('deleteDialog') deleteDialogComponent: ProcessDialogComponent;
  @ViewChild('location') locationComponent: SelectLocationComponent;
  language: Language;
  disabled = false;
  disabled_save = true;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;

  constructor(private generalService: GeneralService,
              private messageService: StandardMessageService, private translate: TranslateService,
              private confirmationService: ConfirmationService, private router: Router) {
  }

  ngOnInit() {

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    if (this.community) {

      this.generalService.getLanguageByCode(this.community.language_code)
        .then(lang => {
            this.language = lang;
            this.initDesabled();
          }
        )
        .catch(error => {
          this.handleError(error);
        });
    }
  }

  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.community.country = location.country.id;
      } else {
        this.community.country = null;
      }
      this.community.country_details = location.country;
      if (location.city) {
        this.community.city = location.city.id;
      } else {
        this.community.city = null;
      }
      this.community.city_details = location.city;

      this.ready_to_save();
    }

  }

  onFileUpload(event) {
    this.community.image = event.id;
    this.community.image_details = event;
    this.ready_to_save();
  }


  saveCommunity() {
    const checkLocation = this.locationComponent.checkLocationName();
    if (checkLocation) {
      this.community.language_code = this.language.code;
      this.disabled_save = true;

      const url = `${'update-community-details/'}${this.community.id}${'/'}${this.language.code}`;
      this.generalService.updateItem(url, this.community)
        .then(res => {
          this.community = res;


          this.messageService.addMessage({
            severity: 'success',
            summary: 'Community',
            detail: 'Successfully updated'
          });


        })
        .catch(error => {
          this.disabled_save = false;
          this.handleError(error);
        });


    }
  }


  getCommunityInLanguage(lang: string) {
    const url = `${'get-community-details-in-language/'}${this.community.id}${'/'}${lang}`;
    this.generalService.getItem(url)
      .then(res => {
        this.community = res;

        this.disabled_save = true;

      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onLanguageSelect(event) {
    this.language = event;
    this.initDesabled();
    this.getCommunityInLanguage(event.code);
  }


  deleteCommunity() {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteDialogComponent.show();
        const url = `${'delete-community/'}`;
        this.generalService.deleteItemByPk(url, this.community.id)
          .then(res => {
            this.deleteDialogComponent.close();
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Community',
              detail: 'Successfully deleted'
            });

            this.router.navigate(['/communities/']);

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


  onLocalChange(event) {

    if (!event) {
      this.community.country = null;
      this.community.country_details = null;
      this.community.city = null;
      this.community.city_details = null;
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
