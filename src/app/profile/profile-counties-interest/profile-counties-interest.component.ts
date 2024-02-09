import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {Country} from '../../general/country';
import {UserProfileCountryInterest} from '../profile';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-profile-counties-interest',
  templateUrl: './profile-counties-interest.component.html',
  styleUrls: ['./profile-counties-interest.component.css']
})
export class ProfileCountiesInterestComponent implements OnInit {
  @Input() profile: number;
  @Input() disabled = false;
  @Output() msgPushed = new EventEmitter<any>();
  countries: Country[];


  constructor(private service: GeneralService,
              private messageService: StandardMessageService) {
  }


  ngOnInit() {

    this.getCountries();
  }


  getCountries(): void {
    const url = `${'get-profile-country-interests/'}${this.profile}`;
    this.service.getItems(url)
      .then(objects => {


        // TODO "this sorting we will use till solve an issue with hvad order_by"
        objects.sort(function (item1, item2) {
          if (item1.country_details.name < item2.country_details.name) {
            return -1;
          } else if (item1.country_details.name > item2.country_details.name) {
            return 1;
          } else {
            return 0;
          }
        });


        this.countries = [];
        for (const object of objects) {

          this.countries.push(object.country_details);


        }


      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onCountrySelect(event): void {


    const new_country = new UserProfileCountryInterest();

    new_country.profile = this.profile;
    new_country.country = event.id;

    const url = `${'create-profile-country-interest'}`;
    this.service.createItem(url, new_country)
      .then(category => {


        this.messageService.addMessage({
          severity: 'success',
          summary: 'Country',
          detail: 'Successfully added'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  deleteCountry(country: Country): void {

    const url = `${'delete-profile-country-interest/'}${this.profile}${'/'}${country.id}${'/'}`;
    this.service.deleteItemByPk(url, null)
      .then(() => {


        this.messageService.addMessage({
          severity: 'success',
          summary: 'Country',
          detail: 'Successfully removed'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
