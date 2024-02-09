import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {Product, ProductGroup} from '../../../product/product';
import {ProductService} from '../../../product/product.service';
import {StandardMessageService} from '../../../standard-message.service';
import {SignalService} from '../../../signal.service';


@Component({
  selector: 'app-product-wizard',
  templateUrl: './product-wizard.component.html',
  styleUrls: ['./product-wizard.component.css'],

})
export class ProductWizardComponent implements OnInit {

  @Input() company: number;
  @Input() product_group: ProductGroup;
  @Output() productCreated = new EventEmitter<Product>();

  product = new Product();

  product_types: SelectItem[];
  selectedProductType = true;
  currentUserId: number;
  disabled_save = true;


  constructor(private translate: TranslateService, private productService: ProductService,
              private signalService: SignalService,

              private messageService: StandardMessageService) {

    this.product_types = [
      {label: '', value: true},
      {label: '', value: false},
    ];

    this.translate.get('PRODUCT.Product').subscribe(res => {

      this.product_types[0].label = res;
    });

    this.translate.get('PRODUCT.Service').subscribe(res => {

      this.product_types[1].label = res;
    });

  }


  ngOnInit() {

    if (this.product_group) {
      if (this.product_group.id) {
        this.product.product_group_details = this.product_group;
        this.product.product_group = this.product_group.id;
      }

    }
    this.currentUserId = +localStorage.getItem('user_id');


    const currentCurrency = +localStorage.getItem('currency');

    if (currentCurrency) {
      this.product.currency = currentCurrency;
    }


  }

  onProductGroupSelected(event) {
    this.product.product_group = event.id;
    this.product.product_group_details = event;
    this.check_ready_to_save();
  }


  onCategorySelect(event) {

    this.product.category = event.id;
    this.product.category_details = event;
    this.check_ready_to_save();

  }

  check_ready_to_save() {

    this.disabled_save = !(this.product.category);

  }

  saveProduct() {

    if (this.product.unit_type_details) {
      this.product.unit_type = this.product.unit_type_details.id;
    }

    this.product.product_or_service = this.selectedProductType;
    this.product.user = this.currentUserId;
    this.product.company = this.company;
    this.product.language_code = 'en';
    this.product.tags = [];

    this.disabled_save = true;
    this.productService.createProduct(this.product)
      .then(product => {

        this.productCreated.emit(product);
        this.disabled_save = false;
        this.signalService.refreshTimeStamp();

      })
      .catch(error => {
        this.handleError(error);
      });

  }

  onSelectedRole(event) {
    if (!event.user) {
      this.company = event.id;
      this.product.company = event.id;
    } else {
      this.company = null;
      this.product.company = null;
    }
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}

