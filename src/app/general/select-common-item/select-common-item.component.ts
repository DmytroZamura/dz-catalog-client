import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {GeneralService} from '../general.service';
import {CommonItem} from '../common-item';
import {Dropdown} from 'primeng/dropdown';

@Component({
  selector: 'app-select-common-item',
  templateUrl: './select-common-item.component.html',
  styleUrls: ['./select-common-item.component.css']
})
export class SelectCommonItemComponent implements OnInit {

  @Input() item: any;
  @Input() items: any[];
  @Input() endpoint: string;
  @Input() disabled = false;
  @Input() showFilter = false;
  @Input() showClear = true;
  @Input() sortByName = true;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() middleText = false;
  @Input() optionLabel = 'name';
  @Input() defaultFilter = '?';
  @Input() viewType = 1; // 1 - dropdownView, 2 - selectButtonView; 3 - customSelectButtons; 4 - autoComplete
  @Input() buttonBadgeClass = '';
  @Input() selectedButtonBadgeClass = '';
    @Input() styleClass = '';
  @Input() highlightColor = '#ebe7ef';
  @Input() namePlural = false;
  @Input() dataKey = 'id';
  @Input() allItemsLabel: string;
  @Input() debounceTime = 500;
  @Input() navigationObject: number;
  @Input() filter: string;
  @Input() checkEnteredName = false;
  @Input() componentId = 'commonItem';
  @Output() itemChange = new EventEmitter<CommonItem>();
  @ViewChild('selectItem') selectItem: Dropdown;
  postNavigationTypes = [1, 21, 61, 71, 81, 91];
  companyNavigationTypes = [2, 5, 92, 95];
  productNavigationTypes = [3, 93, 62, 621, 72, 721, 82];
  communitiesNavigationTypes = [4];
  peopleNavigationTypes = [5, 95];
  enteredName: string;
  itemNotExists = false;


  constructor(private generalService: GeneralService) {
  }

  ngOnInit() {
    if (!this.items && this.viewType !== 4) {
      this.getItems();
    }


  }

  checkItemName(): boolean {
    if (this.enteredName) {
      if (this.item) {
        if (this.item.name !== this.enteredName) {
          this.itemNotExists = true;
          return false;
        }
      } else {
        this.itemNotExists = true;
        return false;
      }

    }

    return true;
  }

  getFilter(): string {

    this.checkNavigationObject();
    let filter = this.defaultFilter;

    if (this.filter) {
      filter = filter + this.filter;
    }

    return filter;

  }

  checkNavigationObject() {

    if (this.navigationObject) {
      if (this.postNavigationTypes.includes(this.navigationObject)) {
        this.defaultFilter = '?posts_exist=True';
      }

      if (this.companyNavigationTypes.includes(this.navigationObject)) {
        this.defaultFilter = '?companies_exist=True';
      }

      if (this.productNavigationTypes.includes(this.navigationObject)) {
        this.defaultFilter = '?products_exist=True';
      }

      if (this.peopleNavigationTypes.includes(this.navigationObject)) {
        this.defaultFilter = '?users_exist=True';
      }


      if (this.communitiesNavigationTypes.includes(this.navigationObject)) {
        this.defaultFilter = '?communities_exist=True';
      }
    }

  }


  getItems(kewWord = null) {
    let filter = this.getFilter();
    if (kewWord) {
      filter = filter + '&name=' + kewWord;
    }


    this.generalService.getCommonItems(this.endpoint, filter)
      .then(items => {

        if (this.sortByName) {
          // TODO "this sorting we will use till solve an issue with hvad order_by"
          items.sort(function (item1, item2) {
            if (item1.name < item2.name) {
              return -1;
            } else if (item1.name > item2.name) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        if (this.allItemsLabel) {
          const allItems = new CommonItem();
          allItems.id = null;
          allItems.name = this.allItemsLabel;
          this.items = [];
          this.items.push(allItems);
          this.items = this.items.concat(items);
        } else {
          this.items = items;
        }


        if (this.item && this.label && this.viewType === 1) {

          this.selectItem.filled = true;

        }


      })
      .catch(error => {
        console.log(error);
      });
  }

  onSelect(event): void {

    this.itemChange.emit(event.value);
  }

  setFilter(filter: string) {

    this.filter = this.defaultFilter + filter;
  }

  setDefaultFilter(filter: string) {

    this.defaultFilter = filter;
    this.filter = filter;

  }

  getFilteredItems(event) {
    if (event.query) {
      this.enteredName = event.query;
    }
    this.getItems(event.query);
  }


  onClear() {
    if (this.item) {


      this.item = null;

      this.itemChange.emit(null);
    }

    this.itemNotExists = false;
    this.enteredName = null;
  }

  onAutoCompleteSelect(event) {
    this.itemNotExists = false;
    this.enteredName = null;
    this.itemChange.emit(event);


  }


  onSelectItem(index: number) {
    if (!this.disabled) {
      if (index != null) {
        this.item = this.items[index];
        this.itemChange.emit(this.items[index]);
      } else {
        this.item = null;
        this.itemChange.emit(null);
      }
    }
  }
}
