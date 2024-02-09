import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-select-ordering',
  templateUrl: './select-ordering.component.html',
  styleUrls: ['./select-ordering.component.css']
})
export class SelectOrderingComponent implements OnInit {
  @Input() currentOrderingCode: string;

  @Output() selectedOrdering = new EventEmitter<string>();
  @Input() recent = false;
  @Input() rating = false;
  @Input() popularity = false;
  @Input() priceLowToHigh = false;
  @Input() priceHighToLow = false;
  @Input() status = false;
  @Input() discounts = false;
  @Input() name = false;
  @Input() close = false;

  @Input() itemsType; // -- 'feed', 'people' , 'products', 'companies' , 'responds', 'requests'

  menuItems: MenuItem[];

  constructor(private translate: TranslateService, public appService: AppService) {
  }

  currentOrderingLabel: string;

  ngOnInit() {
    if (this.itemsType) {
      if (this.itemsType === 'products' || this.itemsType === 'favorite-products') {
        this.recent = true;
        this.rating = true;
        this.popularity = true;
        this.priceHighToLow = true;
        this.priceLowToHigh = true;
        this.discounts = true;

        if (this.itemsType === 'products') {
           this.close = true;
          this.currentOrderingCode = 'popularity';
        } else {
          this.currentOrderingCode = '-create_date';
        }
      }


      if (this.itemsType === 'companies' || this.itemsType === 'favorite-companies' || this.itemsType === 'people') {
        this.recent = true;
        this.rating = true;
        this.popularity = true;
          if (this.itemsType === 'companies' || this.itemsType === 'people') {
            this.close = true;
          }

        if (this.itemsType === 'companies') {
          this.currentOrderingCode = 'popularity';
        } else {
          this.currentOrderingCode = '-create_date';
        }


      }


      if (this.itemsType === 'communities') {
        this.recent = true;

        this.popularity = true;

        this.currentOrderingCode = 'popularity';


      }

      if (this.itemsType === 'tags' || this.itemsType === 'favorite-tags') {

        this.name = true;
        this.popularity = true;
        this.currentOrderingCode = 'popularity';


      }

    }

    this.initMenu();
  }


  initMenu() {

    this.menuItems = [];


    if (this.priceLowToHigh) {
      this.translate.get('GENERAL.Price - Low to High').subscribe(res => {
        this.checkOrderingLabel('price', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {

            this.orderingSelected(res, 'price');


          }
        });

      });
    }

    if (this.priceHighToLow) {
      this.translate.get('GENERAL.Price - High to Low').subscribe(res => {
        this.checkOrderingLabel('-price', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {

            this.orderingSelected(res, '-price');


          }
        });

      });
    }

    if (this.recent) {
      this.translate.get('GENERAL.Recent').subscribe(res => {
        this.checkOrderingLabel('-create_date', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {

            this.orderingSelected(res, '-create_date');


          }
        });

      });
    }
    if (this.rating) {
      this.translate.get('GENERAL.Rating').subscribe(res => {
        this.checkOrderingLabel('rating', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {
            this.orderingSelected(res, 'rating');


          }
        });

      });
    }

    if (this.popularity) {
      this.translate.get('GENERAL.Popularity').subscribe(res => {
        this.checkOrderingLabel('popularity', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {

            this.orderingSelected(res, 'popularity');


          }
        });

      });
    }

    if (this.discounts) {
      this.translate.get('GENERAL.Discounts').subscribe(res => {
        this.checkOrderingLabel('discounts', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {

            this.orderingSelected(res, 'discounts');


          }
        });

      });
    }

    if (this.status) {
      this.translate.get('GENERAL.Status').subscribe(res => {
        this.checkOrderingLabel('status', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {
            this.orderingSelected(res, 'status');


          }
        });

      });
    }


    if (this.name) {
      this.translate.get('GENERAL.Name').subscribe(res => {
        this.checkOrderingLabel('name', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {
            this.orderingSelected(res, 'name');


          }
        });

      });
    }

      if (this.close) {
      this.translate.get('GENERAL.Close').subscribe(res => {
        this.checkOrderingLabel('close', res);
        this.menuItems.push({
          label: res,
          command: (event: any) => {
            this.orderingSelected(res, 'close');


          }
        });

      });
    }


  }

  checkOrderingLabel(code: string, label: string) {
    if (this.currentOrderingCode === code) {
      this.currentOrderingLabel = label;
    }
  }

  orderingSelected(label: string, code: string) {
    this.currentOrderingLabel = label;
    this.selectedOrdering.emit(code);
  }
}
