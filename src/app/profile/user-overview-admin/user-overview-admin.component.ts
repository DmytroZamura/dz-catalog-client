import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


import {Language} from '../../general/language';
import {Profile} from '../profile';

import {GeneralService} from '../../general/general.service';


import {GLocation} from '../../general/city';
import {AppFilterService} from '../../app-filter.service';
import {AppComponent} from '../../app.component';
import {StandardMessageService} from '../../standard-message.service';
import {SelectLocationComponent} from '../../general/select-location/select-location.component';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-user-overview-admin',
  templateUrl: './user-overview-admin.component.html',
  styleUrls: ['./user-overview-admin.component.css']
})
export class UserOverviewAdminComponent implements OnInit {

  @Input() user_id: number;
  @Output() msgPushed = new EventEmitter<any>();
  @ViewChild('location') locationComponent: SelectLocationComponent;

  profile: Profile;
  language: Language;
  disabled = false;
  disabled_save = true;

  constructor(public app: AppComponent, private generalService: GeneralService,
              private messageService: StandardMessageService,
              private filterService: AppFilterService) {
  }


  ngOnInit() {


    this.language = new Language();
    this.language.code = 'en';
    this.set_language();
    this.initDesabled();
    this.getProfile();

    this.filterService.initNavigation(7, this.user_id, 'people');
  }


  ready_to_save() {
    this.disabled_save = false;
  }

  onFileUpload(event) {

    this.profile.img = event.id;
    this.profile.img_details = event;
    this.ready_to_save();
  }

  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.profile.country = location.country.id;
      } else {
        this.profile.country = null;
      }
      this.profile.country_details = location.country;
      if (location.city) {
        this.profile.city = location.city.id;
      } else {
        this.profile.city = null;
      }
      this.profile.city_details = location.city;

      this.ready_to_save();
    }

  }

  testEvent(event) {
    console.log(event);
  }

  checkAndSaveProfile() {
    this.profile.language_code = this.language.code;
    const checkLocation = this.locationComponent.checkLocationName();
    if (checkLocation) {
      this.saveProfile();
    }

  }

  saveProfile() {
    this.disabled_save = true;
    if (this.profile.short_description) {
      this.profile.short_description = UtilsService.addNowFollow(this.profile.short_description);
    }

    const url = `${'profile/'}${this.language.code}`;
    this.generalService.updateItem(url, this.profile)
      .then(res => {


        this.profile = res;
        this.app.appService.userProfile = res;
        this.app.refreshUserRoles();

        console.log('message');

        this.messageService.addMessage({
          severity: 'success',
          summary: 'User profile',
          detail: 'Successfully saved'
        });

      })
      .catch(error => {
        this.disabled_save = false;
        this.handleError(error);
      });


  }

  getProfile() {
    const url = `${'profile/'}${this.language.code}`;

    this.generalService.getItem(url)
      .then(res => {

          this.profile = res;

          this.disabled_save = true;


        }
      )
      .catch(error => {
        this.handleError(error);
      });


  }

  set_language() {
    const url = `${'language-by-code/'}${this.language.code}`;
    this.generalService.getItem(url)
      .then(lang => {
          this.language = lang;
        }
      )
      .catch(error => {
        this.handleError(error);
      });


  }

  initDesabled() {
    this.disabled = !(this.language.code === 'en');
  }

  onLanguageSelect(event) {
    this.language = event;
    this.initDesabled();
    this.getProfile();

  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
