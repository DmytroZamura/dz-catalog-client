import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {GeneralService} from '../general.service';
import {City, GLocation} from '../city';
import {Country, Region} from '../country';
import {SelectCommonItemComponent} from '../select-common-item/select-common-item.component';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {


  @Input() city: City;
  @Input() country: Country;
  @Input() region: Region;
  @Input() initGeo = false;
  @Input() checkEnteredName = false;
  @Input() disabled = false;
  @Input() colClass = 'ui-md-6';


  @Output() selectedLocation = new EventEmitter<GLocation>();
  @ViewChild('selectCity') citiesComponent: SelectCommonItemComponent;
  @ViewChild('selectCountry') countriesComponent: SelectCommonItemComponent;
  disabledCity = true;
  filter = '';


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private generalService: GeneralService) {
  }

  ngOnInit() {
    if (this.initGeo) {
      this.initCurrentCityByGeo();
    }

    if (this.country) {
      this.initLocationsFilter();
    }

    this.initDisabledCity();


  }

  initDisabledCity() {
    if (this.city || this.country) {
      this.disabledCity = false;
    } else {
      this.disabledCity = true;
    }
  }


  checkLocationName(): boolean {
    const cityName = this.citiesComponent.checkItemName();
    if (!cityName) {
      return false;
    }
    return this.countriesComponent.checkItemName();

  }


  initCurrentCityByGeo() {
    const latitude = this.localStorage.getItem('latitude');
    const longitude = this.localStorage.getItem('longitude');

    this.generalService.geoCitySearch(latitude, longitude)
      .then(city => {
        if (city[0]) {
          this.country = city[0].country_details;
          this.initLocationsFilter();
          this.city = city[0];
          this.region = city[0].region_details;
          this.selectLocation();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  selectLocation() {

    const location = new GLocation();
    location.country = this.country;
    location.city = this.city;
    this.initDisabledCity();
    this.selectedLocation.emit(location);
  }


  initLocationsFilter() {
    let filter = '';

    if (this.country) {

      filter = filter + '&country=' + this.country.id;
    }

    this.filter = filter;

    if (this.citiesComponent) {
      this.citiesComponent.setFilter(filter);
    }


  }

  onCountrySelected(event) {
    if (event) {

      this.country = event;

      if (this.city) {
        if (this.city.country !== this.country.id) {
          this.city = null;

        }
      }
    } else {

      this.country = null;
      this.city = null;

    }
    this.initLocationsFilter();

    this.selectLocation();

  }

  onCitySelected(event) {


    this.city = event;
    if (event) {

      if (this.country !== this.city.country_details) {
        this.country = this.city.country_details;
      }
    }
    this.selectLocation();

  }




}
