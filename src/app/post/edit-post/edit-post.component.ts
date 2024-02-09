import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {ObjectImage} from '../../common/object-file';
import {UrlPreviewComponent} from '../../common/url-preview/url-preview.component';
import {Post, PostRequest, PostRequestPosition, PostOffering, PostJob, PostType, PostReview} from '../post';
import {ObjectAttributesComponent} from '../../attribute/object-attributes/object-attributes.component';
import {UrlPreview} from '../../common/url-preview/url-preview';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {AttachedDocument} from '../../common/attached-documents/attached-document';
import {UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';
import {Product, ProductShort} from '../../product/product';
import {PostOptionsComponent} from './post-options/post-options.component';
import {CommonItem} from '../../general/common-item';
import {UtilsService} from '../../utils.service';
import {StandardMessageService} from '../../standard-message.service';
import {SelectCategoryComponent} from '../../category/select-category/select-category.component';
import {Category, SuggestedCategory} from '../../category/category';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Input() urlPreview: UrlPreview;
  @Input() postType: PostType;
  @Input() dialog = false;
  @Input() relatedUser: UserWithProfile;
  @Input() relatedCompany: CompanyShort;
  @Input() relatedProduct: ProductShort;
  @Input() product: Product;
  @Input() truncateNumber = 65;
  @Input() currentCurrencyId: number;


  @Output() postDeleted = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() postPublished = new EventEmitter<Post>();
  @Output() postNotPublished = new EventEmitter();
  @Output() msgPushed = new EventEmitter<any>();

  @ViewChild('previewurl') previewComponent: UrlPreviewComponent;
  @ViewChild('attributes') attributesComponent: ObjectAttributesComponent;
  @ViewChild('options') optionsComponent: PostOptionsComponent;
  @ViewChild('selectCategory') selectCategoryComponent: SelectCategoryComponent;


  waitingForUrlPreview = false;
  comment: string;
  isBrowser: boolean;
  selectedPosition: PostRequestPosition;
  selectedPositionIndex: number;
  newPositionIndex = 1;
  disabledDeletePosition = true;
  showUrlImage: boolean;
  bounds = 'self';
  publishButtonDisabled = false;
  contentError = false;
  errorMessage = 'Please, write a comment or add an image';
  dataInitialized = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private messageService: StandardMessageService,
              @Inject(DOCUMENT) private document: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.initEditPost();
    }
  }

  initEditPost() {
    if (this.isBrowser) {

      // if (this.dialog) {
      //   this.bounds = 'self';
      // } else {
      //   this.bounds = 'body';
      // }
      this.showUrlImage = !(this.post.images.length > 0);


      this.cutCommentUrl();


      if (this.postType) {
        this.onTypeSelect(this.postType);
      }


    }
  }

  @Input() set newPostType(type: CommonItem) {

    this.onTypeSelect(type);
  }

  onTypeSelect(event) {
    if (this.isBrowser) {
      this.post.type_details = event;
      this.post.type = event.id;
      if (this.post.type_details.code === 'request') {

        this.initRequest();
      }
      if (this.post.type_details.code === 'job') {

        this.initJob();
      }


      if (this.post.type_details.code === 'offering') {
        this.initOffering();

        if (this.attributesComponent) {
          let initCheck = true;
          if (this.product) {
            if (this.product.attributes) {
              initCheck = false;
            }
          }
          if (initCheck) {
            this.attributesComponent.initDefaultAttributes(this.post.category, true);
          }
        }
      }
      if (this.post.type_details.code === 'review') {

        this.initReview();
      }
    }
  }

  initRequest(): void {


    if (!this.post.post_request) {
      this.post.post_request = new PostRequest();
      if (this.currentCurrencyId) {
        this.post.post_request.price_currency = this.currentCurrencyId;
        this.post.post_request.price_currency_details = new CommonItem();
        this.post.post_request.price_currency_details.id = this.currentCurrencyId;
      }
    }


  }

  initJob(): void {


    if (!this.post.post_job) {
      this.post.post_job = new PostJob();
      if (this.currentCurrencyId) {
        this.post.post_job.salary_currency = this.currentCurrencyId;
        this.post.post_job.salary_currency_details = new CommonItem();
        this.post.post_job.salary_currency_details.id = this.currentCurrencyId;
      }


    }


  }


  initOffering() {
    if (!this.post.post_offering) {
      this.post.post_offering = new PostOffering();


      if (this.product) {
        this.post.post_offering.type = 3;

        this.post.post_offering.one_price = this.product.one_price;
        this.post.post_offering.price = this.product.price_to;
        this.post.post_offering.price_from = this.product.price_from;
        this.post.post_offering.price_currency = this.product.currency;
        this.post.post_offering.price_currency_details = this.product.currency_details;
        this.post.post_offering.unit_type = this.product.unit_type;
        this.post.post_offering.unit_type_details = this.product.unit_type_details;
        this.post.deadline = this.product.deadline;
        this.post.post_offering.discount = this.product.discount;
        this.post.post_offering.discount_price = this.product.discount_price_to;
        this.post.post_offering.discount_price_from = this.product.discount_price_from;


        if (this.product.attributes) {
          this.post.attributes = this.product.attributes;
        }


      } else {
        this.post.post_offering.type = 1;
        this.post.post_offering.one_price = true;
        if (this.currentCurrencyId) {
          this.post.post_offering.price_currency = this.currentCurrencyId;
          this.post.post_offering.price_currency_details = new CommonItem();
          this.post.post_offering.price_currency_details.id = this.currentCurrencyId;
        }
      }

    }

  }

  initReview() {
    if (!this.post.post_review) {
      this.post.post_review = new PostReview();
      this.post.post_review.rating = 0;


    }


  }


  onRate(rating: number) {
    if (this.post.post_review) {
      this.post.post_review.rating = rating;
      this.contentError = false;
    }
  }

  newPosition() {
    if (this.isBrowser) {
      if (!this.post.post_request_positions) {
        this.post.post_request_positions = [];

      }

      const position = new PostRequestPosition();
      position.quantity = 1;
      position.index = this.newPositionIndex;
      this.newPositionIndex = this.newPositionIndex + 1;
      this.post.post_request_positions.push(position);
      this.selectedPosition = this.post.post_request_positions[this.post.post_request_positions.length - 1];
      this.selectedPositionIndex = this.post.post_request_positions.length - 1;
      this.disabledDeletePosition = false;
    }
  }

  onPositionSelect(event) {
    if (this.isBrowser) {
      this.disabledDeletePosition = false;
      this.selectedPositionIndex = event.index;
    }
  }

  onUnitTypeSelected(event, index: number) {
    if (this.isBrowser) {
      this.post.post_request_positions[index].unit = event.id;
      this.post.post_request_positions[index].unit_details = event;
    }
  }

  onUnitTypeChange(unit: CommonItem) {
    if (this.post.type_details.code === 'offering' && this.post.post_offering) {
      this.post.post_offering.unit_type = unit.id;
    }
  }

  jobTypeSelected(event) {
    if (event) {
      this.post.post_job.job_type_details = event;
      this.post.post_job.job_type = event.id;
    } else {
      this.post.post_job.job_type_details = null;
      this.post.post_job.job_type = null;
    }
  }

  jobFunctionSelected(event) {
    if (event) {
      this.post.post_job.job_function_details = event;
      this.post.post_job.job_function = event.id;
    } else {
      this.post.post_job.job_function_details = null;
      this.post.post_job.job_function = null;
    }
  }

  seniorityLevelSelected(event) {
    if (event) {
      this.post.post_job.seniority_details = event;
      this.post.post_job.seniority = event.id;
    } else {
      this.post.post_job.seniority_details = null;
      this.post.post_job.seniority = null;
    }
  }

  salaryCurrencySelected(event) {
    if (event) {
      this.post.post_job.salary_currency_details = event;
      this.post.post_job.salary_currency = event.id;
    } else {
      this.post.post_job.salary_currency_details = null;
      this.post.post_job.salary_currency = null;
    }
  }


  onDiscountInput(discount: number) {


    if (discount) {
      if (discount >= 100) {
        let str = discount.toString();
        str = str.substr(str.length - 2);
        this.post.post_offering.discount = Number(str);

      }

      if (this.post.post_offering.discount) {
        this.calcDiscount();
      } else {
        this.clearDiscount();
      }

    } else {
      this.clearDiscount();
    }

  }

  clearDiscount() {
    this.post.post_offering.discount_price = null;
    this.post.post_offering.discount_price_from = null;
  }

  calcDiscount() {
    if (this.post.post_offering.discount) {
      if (this.post.post_offering.price) {
        this.post.post_offering.discount_price = Math.round((this.post.post_offering.price -
          this.post.post_offering.price * (this.post.post_offering.discount / 100)) * 100) / 100;
      } else {
        this.post.post_offering.discount_price = null;
      }

      if (this.post.post_offering.price_from && !this.post.post_offering.one_price) {
        this.post.post_offering.discount_price_from = Math.round((this.post.post_offering.price_from -
          this.post.post_offering.price_from * (this.post.post_offering.discount / 100)) * 100) / 100;
      } else {
        this.post.post_offering.discount_price_from = null;
      }
    }
  }


  deletePosition() {
    if (this.isBrowser) {
      this.disabledDeletePosition = true;
      this.post.post_request_positions.splice(this.selectedPositionIndex, 1);
    }
  }

  @Input() set createdNewContent(value: boolean) {

    this.newContent();
  }

  newContent() {
    this.contentError = false;
    this.publishButtonDisabled = false;
  }

  cancel() {
    this.contentError = false;
    this.canceled.emit();
  }

  @Input() set newPostPublished(value: boolean) {

    this.onPublishPost();
  }

  onPublishPost() {

    const categoryChecked = this.selectCategoryComponent.checkCategoryName();
    if (categoryChecked) {
      if (this.isBrowser) {

        this.publishButtonDisabled = true;

        if (this.post.type_details.code === 'offering') {
          this.post.attributes = this.attributesComponent.getAttributes();
        }

        if (this.post.type_details.code === 'question' && !this.post.related_user && !this.post.related_company
          && !this.post.related_product) {
          this.post.post_options = this.optionsComponent.getOptions();
        }

        if (this.post.url && !this.post.title) {
          this.waitingForUrlPreview = true;
          this.previewComponent.getUrlPreview(this.post.url);
        } else {

          let checkPost = true;

          if (this.post.type_details.code === 'review') {

            checkPost = (this.post.post_review.disadvantages || this.post.post_review.advantages
              || this.post.comment) && this.post.post_review.rating > 0;

          } else {
            if (this.post.comment || this.post.url || this.post.title || this.post.post_title) {
              checkPost = true;
            } else {
              checkPost = false;
            }


          }

          if (checkPost) {
            this.publishPost();
          } else {
            this.publishButtonDisabled = false;
            this.postNotPublished.emit();
            if (this.post.type_details.code !== 'review') {

              this.errorMessage = 'Please, write a comment or add an image';
              this.contentError = true;


            } else {
              this.errorMessage = 'Please, rate and write your comment';
              this.contentError = true;
            }

          }
        }
      }
    }

  }


  mainLinkChanged(event) {


    // if (this.post.type_details.code !== 'job') {

    this.post.url = event;
    // this.checkVideoUrl(event);
    this.setUrlPreviewNull();
    this.previewComponent.getUrlPreview(this.post.url);

  }

  // checkLinks() {
  //   if (this.isBrowser) {
  //
  //     let url: string;
  //     if (this.post.comment) {
  //       const links = this.linkifyService.find(this.post.comment);
  //
  //       if (links[0]) {
  //
  //
  //         for (const link of links) {
  //           if (link.type === 'url') {
  //             url = link.href;
  //             break;
  //           }
  //         }
  //
  //
  //       }
  //
  //     }
  //
  //     if (url) {
  //       if (url !== this.post.url) {
  //         this.post.url = url;
  //         this.setUrlPreviewNull();
  //         this.previewComponent.getUrlPreview(this.post.url);
  //       }
  //     } else {
  //       this.post.url = null;
  //       this.setUrlPreviewNull();
  //     }
  //
  //   }
  // }


  initDefaultAttributes(category: number) {
    if (this.isBrowser) {
      if (this.post.type_details.code === 'offering') {

        this.attributesComponent.initDefaultAttributes(category, true);
      }
    }
  }

  setUrlPreviewNull() {

    this.post.title = null;
    this.post.description = null;
    this.post.image_url = null;
    this.post.site_name = null;
    this.urlPreview = null;
    this.post.is_video_url = false;
  }

  cutCommentUrl() {
    if (this.post.url && this.post.comment && !this.post.images) {
      this.comment = this.post.comment.replace(this.post.url, '');
    } else {
      this.comment = this.post.comment;
    }
  }

  publishPost(): void {
    this.addNowFollow();
    this.contentError = false;
    this.cutCommentUrl();
    this.postPublished.emit(this.post);

  }

  addNowFollow() {
    this.post.comment = UtilsService.addNowFollow(this.post.comment);
    if (this.post.post_review) {
      if (this.post.post_review.advantages) {
        this.post.post_review.advantages = UtilsService.addNowFollow(this.post.post_review.advantages);
      }
      if (this.post.post_review.disadvantages) {
        this.post.post_review.disadvantages = UtilsService.addNowFollow(this.post.post_review.disadvantages);
      }
    }


  }

  deletePost(): void {
    this.postDeleted.emit();
  }


  onImageDeleted(event) {
    this.post.images.splice(event, 1);
    if (this.post.images.length === 0) {
      // this.checkLinks();
      this.showUrlImage = true;
    }

  }


  onNewPreview(event: UrlPreview) {

    if (event) {
      this.urlPreview = event;
      this.post.title = event.title;
      this.post.image_url = event.image;
      this.post.description = event.description;
      this.post.is_video_url = event.is_video_url;
      this.post.site_name = event.site_name;
    } else {
      this.urlPreview = null;
      this.setUrlPreviewNull();
    }

    if (this.waitingForUrlPreview) {
      this.waitingForUrlPreview = false;
      this.onPublishPost();
    }
  }


  onFileUpload(event) {

    if (!this.post.images) {
      this.post.images = [];
    }

    const image = new ObjectImage();
    image.file = event.id;
    image.file_details = event;
    this.post.images.push(image);
    this.showUrlImage = false;


  }

  onDocumentsChanged(documents: AttachedDocument[]) {
    this.post.documents = documents;
  }


  onCurrencyChange(event: CommonItem) {
    if (this.post.type_details.code === 'request') {
      this.post.post_request.price_currency_details = event;
      this.post.post_request.price_currency = event.id;
    }

    if (this.post.type_details.code === 'offering') {
      if (event) {
        this.post.post_offering.price_currency_details = event;
        this.post.post_offering.price_currency = event.id;
      } else {
        this.post.post_offering.price_currency_details = null;
        this.post.post_offering.price_currency = null;
        this.post.post_offering.price = null;
        this.post.post_offering.price_from = null;
        this.post.post_offering.discount_price = null;
        this.post.post_offering.discount_price_from = null;
        this.post.post_offering.discount = null;
      }
    }
  }

  onDateSelect(event) {
    const date = new Date(Date.parse(event));
    this.post.post_request.deadline = UtilsService.convertToServerDate(event);


  }

  onPostDeadlineSelect(event) {
    const date = new Date(Date.parse(event));
    this.post.deadline = UtilsService.convertToServerDate(event);


  }

  clearPostDeadLine() {
    this.post.deadline = null;
  }


  onCategorySelect(event) {

    this.post.suggested_category_details = null;
    this.post.suggested_category = null;
    if (event.id) {

      this.post.category = event.id;

    } else {
      this.post.category = null;
    }
    if (this.attributesComponent && this.post.type_details.code === 'offering') {
      this.attributesComponent.initDefaultAttributes(this.post.category, true);
    }
    this.post.category_details = event;


  }

  onCategorySuggested(category: SuggestedCategory) {

    this.post.suggested_category = category.id;
    this.post.suggested_category_details = category;
    this.post.category = null;
    this.checkSuggestedCategory();
    if (this.attributesComponent) {
      this.attributesComponent.initDefaultAttributes(null, true);
    }


  }

  checkSuggestedCategory() {

    if (this.post.suggested_category_details) {
      if (!this.post.category_details) {
        this.post.category_details = new Category();
      }
      this.post.category_details.name = this.post.suggested_category_details.name;
    }
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
