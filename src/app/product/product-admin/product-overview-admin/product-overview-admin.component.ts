import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {Language} from '../../../general/language';
import {Product} from '../../product';
import {ConfirmationService} from 'primeng/api';
import {ProductService} from '../../product.service';

import {GeneralService} from '../../../general/general.service';
import {ObjectAttributesComponent} from '../../../attribute/object-attributes/object-attributes.component';
import {UtilsService} from '../../../utils.service';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {SuggestedCategory, Category} from '../../../category/category';
import {SelectCategoryComponent} from '../../../category/select-category/select-category.component';
import {SelectCommonItemComponent} from '../../../general/select-common-item/select-common-item.component';
import {AppComponent} from '../../../app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-product-overview-admin',
  templateUrl: './product-overview-admin.component.html',
  styleUrls: ['./product-overview-admin.component.css'],
  providers: [ConfirmationService]
})
export class ProductOverviewAdminComponent implements OnInit {
  @Input() product: Product;
  @Input() current_currency = 1;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() productDeleted = new EventEmitter<void>();
  @Output() productChanged = new EventEmitter<void>();
  @ViewChild('attributes') attributesComponent: ObjectAttributesComponent;
  @ViewChild('deleteDialog') deleteDialogComponent: ProcessDialogComponent;
  @ViewChild('selectCategory') selectCategoryComponent: SelectCategoryComponent;
  @ViewChild('selectOrigin') selectOriginComponent: SelectCommonItemComponent;
  language: Language;
  disabled = false;
  disabled_save = true;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  processing = false;
  isBrowser = false;
  isMobile = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private deviceService: DeviceDetectorService,
              private confirmationService: ConfirmationService, private productService: ProductService,
              private messageService: StandardMessageService, private translate: TranslateService,
              private generalService: GeneralService, public app: AppComponent) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    this.generalService.getLanguageByCode(this.product.language_code)
      .then(lang => {
          this.language = lang;
          this.initDesabled();
        }
      )
      .catch(error => {
        this.handleError(error);
      });
    this.checkProductGroupDesc();


  }


  initDesabled() {
    this.disabled = !(this.language.code === 'en');
  }

  ready_to_save() {
    this.disabled_save = false;
  }

  onGroupSelected(event) {
    if (event) {
      this.product.product_group_details = event;
      this.product.product_group = event.id;
    } else {
      this.product.product_group_details = null;
      this.product.product_group = null;
    }
    this.ready_to_save();
  }

  Publish() {
    this.product.published = !this.product.published;

    this.saveProduct();
  }

  Unpublish() {
    this.product.published = false;
    this.saveProduct();

  }

  deleteProduct() {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteDialogComponent.show();
        this.productService.deleteProduct(this.product.id)
          .then(res => {
            this.app.newTimestamp();
            this.deleteDialogComponent.close();
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Product',
              detail: 'Successfully deleted'
            });

            this.productDeleted.emit();


          })
          .catch(error => {
            this.deleteDialogComponent.close();
            this.handleError(error);
          });

      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });


  }

  checkProductGroupDesc() {

    if (this.product.product_group && !this.product.product_group_details.name) {
      this.product.product_group_details = this.product.product_group_details_default;
    }
  }

  saveProduct() {


    const categoryChecked = this.selectCategoryComponent.checkCategoryName();
    const originChecked = this.selectOriginComponent.checkItemName();

    if (categoryChecked && originChecked) {

      this.product.attributes = this.attributesComponent.getAttributes();
      this.product.language_code = this.language.code;
      this.disabled_save = true;
      this.processing = true;
      if (this.product.short_description) {
        this.product.short_description = UtilsService.addNowFollow(this.product.short_description);
      }
      if (this.product.packaging_and_delivery) {
        this.product.packaging_and_delivery = UtilsService.addNowFollow(this.product.packaging_and_delivery);
      }
      this.productService.updateProduct(this.product, this.language.code)
        .then(res => {
          this.product = res;
          this.processing = false;
          this.app.newTimestamp();
          this.checkSuggestedCategory();
          this.checkProductGroupDesc();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Product',
            detail: 'Successfully updated'
          });

          this.productChanged.emit();
        })
        .catch(error => {
          this.disabled_save = false;
          this.processing = false;
          this.handleError(error);
        });
    }
  }


  getProductInLanguage(lang: string, cancel: boolean) {

    this.productService.getProductInLanguage(this.product.id, lang, this.current_currency)
      .then(res => {

        this.product = res;
        this.checkSuggestedCategory();
        this.disabled_save = true;
        this.checkProductGroupDesc();

      })
      .catch(error => {
        this.handleError(error);
      });
  }


  onLanguageSelect(event) {
    this.language = event;
    this.getProductInLanguage(event.code, false);
    this.initDesabled();
  }

  onCountrySelect(event) {
    if (event) {
      this.product.origin = event.id;
    } else {
      this.product.origin = null;
    }
    this.product.origin_details = event;


    this.ready_to_save();
  }


  onUnitTypeCnange(event) {
    this.product.unit_type = event.id;
    this.product.unit_type_details = event;
    this.ready_to_save();

  }

  onCurrencyChange(event) {


    if (event) {
      this.product.currency = event.id;
      this.product.currency_details = event;
    } else {
      this.product.currency = null;
      this.product.currency_details = null;
      this.product.price_to = null;
      this.product.price_from = null;
      this.product.discount_price_to = null;
      this.product.discount_price_from = null;
      this.product.discount = null;
    }


    this.ready_to_save();
  }

  onCategorySelected(event) {

    this.product.suggested_category_details = null;
    this.product.suggested_category = null;
    if (event.id) {

      this.product.category = event.id;
    } else {
      this.product.category = null;
    }
    this.product.category_details = event;
    this.attributesComponent.initDefaultAttributes(this.product.category, true);


    this.ready_to_save();

  }

  onDeadlineSelect(event) {
    const date = new Date(Date.parse(event));
    this.product.deadline = UtilsService.convertToServerDate(event);
    this.ready_to_save();


  }

  clearDeadLine() {
    this.product.deadline = null;
    this.ready_to_save();
  }

  onDiscountInput(discount: number) {


    if (discount) {
      if (discount >= 100) {
        let str = discount.toString();
        str = str.substr(str.length - 2);
        this.product.discount = Number(str);

      }

      if (this.product.discount) {
        this.calcDiscount();
      } else {
        this.clearDiscount();
      }

    } else {
      this.clearDiscount();
    }

  }

  clearDiscount() {
    this.product.discount_price_to = null;
    this.product.discount_price_from = null;
  }

  calcDiscount() {
    if (this.product.discount) {
      if (this.product.price_to) {
        this.product.discount_price_to = Math.round((this.product.price_to -
          this.product.price_to * (this.product.discount / 100)) * 100) / 100;
      } else {
        this.product.discount_price_to = null;
      }

      if (this.product.price_from && !this.product.one_price) {
        this.product.discount_price_from = Math.round((this.product.price_from -
          this.product.price_from * (this.product.discount / 100)) * 100) / 100;
      } else {
        this.product.discount_price_from = null;
      }
    }
  }

  onCategorySuggested(category: SuggestedCategory) {

    this.product.suggested_category = category.id;
    this.product.suggested_category_details = category;
    this.product.category = null;
    this.checkSuggestedCategory();

    this.ready_to_save();
  }

  checkSuggestedCategory() {

    if (this.product.suggested_category_details) {
      if (!this.product.category_details) {
        this.product.category_details = new Category();
      }
      this.product.category_details.name = this.product.suggested_category_details.name;
    }
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
