import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CompanyShort} from '../company';

import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit {
  filteredCompanies: CompanyShort[];
  @Input() company: CompanyShort;
  @Input() label_text: string;
  @Input() disabled = false;
  @Input() education = false;
  @Input() requred = false;
  @Input() label = true;
  @Output() companySelected = new EventEmitter<CompanyShort>();
  @Output() companyNameSelected = new EventEmitter<string>();
  filter = '';

  constructor(private service: GeneralService) {
  }

  ngOnInit() {
  }


  formFilter() {

    let filter_str = '?';
    if (this.education) {
      filter_str = filter_str + '&education=True';
    }

    this.filter = filter_str;


  }

  getFilteredCompanies(event): void {


    if (event.query) {
      this.companyNameSelected.emit(event.query);
      this.formFilter();

      const url = `${'search-companies-by-name/'}${event.query}`;
      this.service.getItems(url, this.filter)
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

          this.filteredCompanies = res;


        })
        .catch(error => {
          console.log(error);
        });


    }

  }


  onCompanySelect(event) {


    this.companySelected.emit(event);


  }


  onClear() {
    this.company = null;

    this.companySelected.emit(null);
  }


}
