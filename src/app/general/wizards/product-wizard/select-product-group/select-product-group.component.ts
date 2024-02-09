import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductGroup} from '../../../../product/product';
import {ProductService} from '../../../../product/product.service';


@Component({
  selector: 'app-select-product-group',
  templateUrl: './select-product-group.component.html',
  styleUrls: ['./select-product-group.component.css']
})
export class SelectProductGroupComponent implements OnInit {
  @Input() company_id: number;
  @Input() user_id: number;
  @Input() group: ProductGroup;
  @Input() disabled = false;
  @Input() required = false;
  @Output() producGroupSelected = new EventEmitter<ProductGroup>();
  filteredGroups: ProductGroup[];
  debounceTime = 500;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {


  }

  getFilteredGroups(event): void {
    console.log('filte');
    this.filteredGroups = [];
    if (!event.query) {
      event.query = null;
    }

    if (this.company_id) {

      this.productService.searchCompanyProductGroups(this.company_id, event.query)
        .then(items => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
          items = this.sortItems(items);

          this.filteredGroups = items;
          console.log(this.filteredGroups);


        })
        .catch(error => {
          console.log(error);
        });
    } else {

      this.productService.searchUserProductGroups(this.user_id, event.query)
        .then(items => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
          items = this.sortItems(items);

          this.filteredGroups = items;
          // this.filteredGroups = [];
          // this.filteredGroups = this.filteredGroups.concat(items);



        })
        .catch(error => {
          console.log(error);
        });
    }


  }


  sortItems(items: ProductGroup[]): ProductGroup[] {
    items.sort(function (item1, item2) {
      if (item1.name < item2.name) {
        return -1;
      } else if (item1.name > item2.name) {
        return 1;
      } else {
        return 0;
      }
    });

    // this.filteredGroups = items;

    return items;
  }

  onGroupSelect(event) {


    this.producGroupSelected.emit(event);


  }

  onClear() {
   this.producGroupSelected.emit(null);
  }


}
