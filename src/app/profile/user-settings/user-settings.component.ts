import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {LanguageService} from '../../general/language.service';
import {ConfirmationService} from 'primeng/api';
import {UserSettings} from '../profile';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';

import {TranslateService} from '@ngx-translate/core';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {Router} from '@angular/router';
import {GLocation} from '../../general/city';
import {SelectLocationComponent} from '../../general/select-location/select-location.component';
import {NotificationsService} from '../../notification/notifications.service';
import {AppFilterService} from '../../app-filter.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [ConfirmationService]
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialogComponent: ProcessDialogComponent;
  @ViewChild('location') locationComponent: SelectLocationComponent;
  isBrowser = false;
  msgs1: string;
  severity = 'info';


  userSettings: UserSettings;
  edit_mode = false;
  disabled_save = true;
  slug: string;
  messageYourCompanyAdmin: string;
  messageYourCommunityAdmin: string;
  rejectedLabel: string;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  greetingsMessage: string;
  greetingsMessageTitle: string;
  savedMessage: string;
  errorMessage: string;
  urlExistMessage: string;
  anotherOptionMessage: string;
  saveDisabled = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(LOCAL_STORAGE) private localStorage: any,
              private notificationsService: NotificationsService,
              private filterService: AppFilterService, public app: AppComponent,
              private metaService: MetaService,
              private service: GeneralService,
              private languageService: LanguageService,
              private translate: TranslateService, private confirmationService: ConfirmationService,
              private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {


    this.app.appService.setLanguage();


    if (this.isBrowser) {
      this.filterService.initNavigation(0, null, null);
      this.getUserSettings();
    }

    this.metaService.addMetaTags('settings', null,
      null, null, null, null, false, null, null);

    this.translate.get('GENERAL.You can\'t delete your profile because you are only one admin of the company').subscribe(res => {
      this.messageYourCompanyAdmin = res;

    });
    this.translate.get('GENERAL.You can\'t delete your profile because you are only one admin of the community').subscribe(res => {
      this.messageYourCommunityAdmin = res;

    });

    this.translate.get('GENERAL.Rejected').subscribe(res => {
      this.rejectedLabel = res;

    });

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    this.translate.get('GENERAL.Welcome').subscribe(res => {
      this.greetingsMessageTitle = res;

    });

    this.translate.get('GENERAL.Check settings message').subscribe(res => {
      this.greetingsMessage = res;

    });

    this.translate.get('ALERTS.Saved').subscribe(res => {
      this.savedMessage = res;

    });

    this.translate.get('ALERTS.An error occurred').subscribe(res => {
      this.errorMessage = res;

    });

    this.translate.get('ALERTS.This URL already exists').subscribe(res => {
      this.urlExistMessage = res;

    });

    this.translate.get('ALERTS.Try another option').subscribe(res => {
      this.anotherOptionMessage = res;

    });


  }


  checkStatus() {
    if (!this.userSettings.settings_checked) {
      this.msgs1 = this.greetingsMessage;
      this.severity = 'info';
      // this.msgs1.push({severity: 'info', summary: this.greetingsMessageTitle, detail: this.greetingsMessage});
    }
  }

  onEditProfile() {
    this.router.navigate(['/profile/']);
  }

  onDeleteProfile() {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,
      icon: 'fa fa-trash',
      accept: () => {

        const url = `${'check-delete-company-admin-status'}`;
        this.service.getItem(url)
          .then(res => {

            if (res.status) {
              const url1 = `${'check-delete-community-admin-status'}`;
              this.service.getItem(url1)
                .then(res1 => {

                  if (res1.status) {
                    this.deleteDialogComponent.show();

                    const urlD = `${'delete-user-profile/'}`;
                    this.service.deleteItemByPk(urlD, null)
                      .then(res3 => {
                        this.deleteDialogComponent.close();
                        this.app.logout();


                      })
                      .catch(error => {
                        this.handleError(error);
                      });

                  } else {
                    this.msgs1 = this.messageYourCommunityAdmin + '-' + res1.community;
                    this.severity = 'error';


                  }


                })
                .catch(error => {
                  this.handleError(error);
                });


            } else {
              this.msgs1 = this.messageYourCommunityAdmin + '-' + res.company;
              this.severity = 'error';
              // this.msgs1.push({severity: 'error', summary: this.messageYourCompanyAdmin + '-', detail: res.company});
            }


          })
          .catch(error => {
            this.handleError(error);
          });


      },
      reject: () => {


        this.msgs1 = this.rejectedLabel;
        this.severity = 'info';
        // this.msgs1.push({severity: 'info', summary: this.rejectedLabel, detail: ''});
      }
    });


  }


  ready_to_save() {
    this.disabled_save = false;
  }

  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.userSettings.country = location.country.id;
      } else {
        this.userSettings.country = null;
      }
      this.userSettings.country_details = location.country;
      if (location.city) {
        this.userSettings.city = location.city.id;
      } else {
        this.userSettings.city = null;
      }
      this.userSettings.city_details = location.city;

      if (this.userSettings.country_details) {
        if (this.userSettings.country_details.currency && !this.userSettings.settings_checked) {
          this.userSettings.default_currency = this.userSettings.country_details.currency;
          this.userSettings.default_currency_details = this.userSettings.country_details.currency_details;
        }
      }
      if (!this.userSettings.settings_checked) {
        this.updateSettings(false);
      }
    }
    this.ready_to_save();
  }

  onLanguageSelect(event) {
    this.userSettings.language_details = event;
    this.userSettings.interface_lang = event.id;
    this.ready_to_save();
  }

  onCurrencySelect(event) {
    this.userSettings.default_currency_details = event;
    this.userSettings.default_currency = event.id;
    this.ready_to_save();
  }

  edit(): void {
    this.edit_mode = true;
    this.disabled_save = true;

  }

  checkLanguage(): void {


    const current_locale = this.localStorage.getItem('language_code');
    const user_profile_locale = this.userSettings.language_details.code;


    if (current_locale !== user_profile_locale) {
      this.localStorage.setItem('language_code', user_profile_locale);
      this.languageService.setLocale(user_profile_locale, true);
    }


  }

  getUserSettings(): void {


    const url = `${'user-settings'}`;
    this.service.getItem(url)
      .then(res => {

        this.userSettings = res;
        this.slug = res.slug;
        this.checkStatus();


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  save(): void {

    const checkLocation = this.locationComponent.checkLocationName();

    if (checkLocation) {

      this.saveDisabled = true;
      if (this.slug !== this.userSettings.slug) {

        const url = `${'check-profile-slug/'}${this.userSettings.slug}`;
        this.service.getItem(url)
          .then(res => {

            if (!res.exists) {
              this.updateSettings();
            } else {
              this.saveDisabled = false;
              this.msgs1 = this.urlExistMessage + '. ' + this.anotherOptionMessage;
              this.severity = 'error';
              // this.msgs1.push({severity: 'error', summary: this.urlExistMessage + '.', detail: this.anotherOptionMessage});
            }

          })
          .catch(error => {
            this.handleError(error);
            this.saveDisabled = false;
          });


      } else {
        this.updateSettings();
      }

    }
  }

  updateSettings(isChecked = true) {
    const wasChecked = this.userSettings.settings_checked;
    this.userSettings.settings_checked = isChecked;

    if (isChecked) {
      this.msgs1 = null;
    }

    this.checkLanguage();
    const url = `${'user-settings'}`;
    this.service.updateItem(url, this.userSettings)
      .then(profile => {


        this.saveDisabled = false;

        this.userSettings = profile;
        this.slug = profile.slug;
        this.app.appService.userProfile.country = this.userSettings.country;
        this.app.appService.userProfile.country_details = this.userSettings.country_details;
        this.app.appService.userProfile.city = this.userSettings.city;
        this.app.appService.userProfile.city_details = this.userSettings.city_details;
        this.app.appService.userProfile.notifications_sound = this.userSettings.notifications_sound;
        this.app.appService.userProfile.message_sound = this.userSettings.message_sound;
        this.localStorage.setItem('currency', profile.default_currency.toString());

        if (isChecked) {
          this.disabled_save = true;
          this.msgs1 = this.savedMessage;
          this.severity = 'success';


        }

        if (!wasChecked && isChecked) {
          this.checkActions();
          this.router.navigate(['/feed/']);
        }

      })
      .catch(error => {
        this.handleError(error);
        this.saveDisabled = false;
      });


  }

  cancel(): void {

    this.edit_mode = false;
    this.getUserSettings();
  }

  checkActions() {
    this.notificationsService.checkUserActions()
      .then(result => {

      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): void {
    this.msgs1 = this.errorMessage;
    this.severity = 'error';

  }

}


