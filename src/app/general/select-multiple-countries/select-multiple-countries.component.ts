import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../country';
import {GeneralService} from '../general.service';

@Component({
  selector: 'app-select-multiple-countries',
  templateUrl: './select-multiple-countries.component.html',
  styleUrls: ['./select-multiple-countries.component.css']
})
export class SelectMultipleCountriesComponent implements OnInit {

  filteredCounties: Country[];

  @Input() countries: Country[];
  @Input() label = true;
  @Input() label_text: string;
  @Input() disabled = false;
  @Output() countrySelect = new EventEmitter<Country>();
  @Output() countryUnselect = new EventEmitter<Country>();


  constructor(private generalService: GeneralService) {
  }

  ngOnInit() {


  }


  getFilteredCountries(event): void {

    const url = `${'country-search/'}${event.query}`;
    this.generalService.getItems(url)
    .then(res => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
        res.sort(function (item1, item2) {
          if (item1.name < item2.name) {
            return -1;
          } else if (item1.name > item2.name) {
            return 1;
          } else {
            return 0;
          }
        });

        this.filteredCounties = res;

      })
      .catch(error => {
        console.log(error);
      });




  }


  onCountrySelect(event) {


    this.countrySelect.emit(event);


  }

  onCountryUnselect(event) {

    this.countryUnselect.emit(event);


  }


}
