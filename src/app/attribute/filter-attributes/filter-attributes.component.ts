import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CategoryAttribute, FilterSet, FilterValue} from '../attribute';
import {Currency} from '../../general/currency';
import {GeneralService} from '../../general/general.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {BrowserService} from '../../browser.service';
import {CommonItem} from '../../general/common-item';


@Component({
  selector: 'app-filter-attributes',
  templateUrl: './filter-attributes.component.html',
  styleUrls: ['./filter-attributes.component.css']
})
export class FilterAttributesComponent implements OnInit {
  @Input() category: number;
  @Input() postType: CommonItem;
  @Input() showPrice = false;
  @Input() current_currency: number;
  @Input() show = false;
  @Input() disabled = false;
  @Output() showPanelAttributes = new EventEmitter<boolean>();
  @Output() seletedFilter = new EventEmitter<FilterSet>();
  isBrowser = false;
  attributes: CategoryAttribute[];

  priceFrom: number;
  priceTo: number;
  current_currency_details: Currency;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
              private service: GeneralService, private browserService: BrowserService) {
    this.isBrowser = browserService.isBrowser;
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (this.showPrice) {
        if (!this.current_currency) {
          const current_currency = +localStorage.getItem('currency');

          if (current_currency) {
            this.current_currency = current_currency;
          } else {
            this.current_currency = 1;
          }
        }

        this.getCurrentCurrencyDetails();
      }

      if (this.postType) {
        if (this.postType.code === 'offering') {
          this.show = true;
        }
      }

      if (this.category && this.show) {
        this.getFilterAttributes(this.category);
      }


    }
  }

  getCurrentCurrencyDetails() {

    const endpoint = `${'currency/'}${this.current_currency}`;
    this.service.getItem(endpoint)
      .then(res => {

        this.current_currency_details = res;


      })
      .catch(error => {
        console.log(error);
      });


  }

  onProductsListSelected() {

    this.show = true;
    if (this.category) {
      this.showFilter(this.category);
    }

  }

  showFilter(category: number) {

    this.category = category;
    if (this.show && category) {

      this.getFilterAttributes(category);

    } else {
      this.attributes = null;
    }
  }

  getFilterAttributes(category: number) {


    const endpoint = `${'get-category-attributes/'}${category}`;
    this.service.getItems(endpoint)
      .then(res => {
        this.attributes = [];
        if (res) {


          this.attributes = res;
          if (this.attributes[0]) {


            this.show = true;
            this.showPanelAttributes.emit(true);
          }
        }


      })
      .catch(error => {
        console.log(error);
      });


  }

  onPostTypeChange(event) {

    this.postType = event;

    if (this.postType) {
      if (this.postType.code === 'offering') {
        this.show = true;
        this.showFilter(this.category);
      } else {
        this.show = false;
        this.showPanelAttributes.emit(false);
      }
    } else {
      this.show = false;
      this.showPanelAttributes.emit(false);
    }

  }


  onValueChanged(index: number, value: FilterValue) {

    this.attributes[index].filter_value = value;
  }

  onFilter() {
    const filterSet = new FilterSet();
    filterSet.filterValues = [];
    for (const attribute of this.attributes) {
      if (attribute.filter_value) {
        filterSet.filterValues.push(attribute.filter_value);
      }

    }

    if (this.priceFrom || this.priceTo) {
      filterSet.currency = this.current_currency;
      filterSet.price_from = this.priceFrom;
      filterSet.price_to = this.priceTo;
    }


    this.seletedFilter.emit(filterSet);

  }

  onClearFilter() {

    this.priceFrom = null;
    this.priceTo = null;
    this.attributes = [];

    this.showFilter(this.category);
    this.seletedFilter.emit(null);


  }

}
