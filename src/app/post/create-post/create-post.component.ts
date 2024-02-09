import {Input, Component, OnInit, EventEmitter, Output, Inject, ViewChild, PLATFORM_ID} from '@angular/core';



import {Post} from '../post';
import {Category} from '../../category/category';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {CommonItem} from '../../general/common-item';
import {AppConfig} from '../../config/config.service';
import {UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';
import { ProductShort} from '../../product/product';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isPlatformBrowser} from '@angular/common';
import {StandardMessageService} from '../../standard-message.service';
import {SignalService} from '../../signal.service';
import {GLocation} from '../../general/city';
import {SelectLocationComponent} from '../../general/select-location/select-location.component';

import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input() dialog = false;
  @Input() company: number;
  @Input() product: ProductShort;
  @Input() community: number;
  @Input() category: Category;
  @Input() postTypes: CommonItem[];
  @Input() relatedUser: UserWithProfile;
  @Input() relatedCompany: CompanyShort;
  @Input() relatedProduct: ProductShort;
  @Input() defaultPostTypeId = AppConfig.settings.defaultPostTypeId;
  @Input() defaultPostTypeCode = 'post';
  @Input() objectRelatedTypesFilter: string;
  @Input() placeholder = '';
  @Input() currentCurrencyId: number;


  @Output() postCreated = new EventEmitter<Post>();
  @Output() canceled = new EventEmitter();
  @Output() postNotPublished = new EventEmitter();
  @Output() msgPushed = new EventEmitter<any>();

  @ViewChild('editpost') editPostComponent: any;
  @ViewChild('location') locationComponent: SelectLocationComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;


  filter = '';

  postType: CommonItem;
  disabledSelectUserOrCompany = false;

  currentUserId: number;
  post: Post;
  newPost = false;
  truncateNumber = 55;
  isMobile = false;
  isBrowser = false;

  constructor( private service: GeneralService, @Inject(LOCAL_STORAGE) private localStorage: any, private signalService: SignalService,
              @Inject(PLATFORM_ID) private platformId: Object, private deviceService: DeviceDetectorService,
              private standardMessageService: StandardMessageService) {

    this.currentUserId = +localStorage.getItem('user_id');
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (this.isMobile) {
        this.truncateNumber = 35;
      }

      const currentCurrency = +localStorage.getItem('currency');

      if (currentCurrency) {
        this.currentCurrencyId = currentCurrency;
      } else {
        this.currentCurrencyId = 1;
      }


    }
    if (this.company) {
      this.disabledSelectUserOrCompany = true;

    }

    if (this.relatedCompany) {
      this.relatedUser = null;
    }

    if (this.objectRelatedTypesFilter) {
      this.filter = '?object_related=' + this.objectRelatedTypesFilter;
    }


  }

  publishPost() {
    this.editPostComponent.nativeElement.newPostPublished = true;
  }

  onSelectedRole(event) {
    if (!event.user) {
      this.company = event.id;
      this.post.company = event.id;
    } else {
      this.company = null;
      this.post.company = null;
    }


    if (event.country_details || event.city_details) {

      const location = new GLocation();

      if (event.country_details) {
        location.country = event.country_details;
        this.locationComponent.onCountrySelected(event.country_details);
      }

      if (event.city_details) {
        location.city = event.city_details;
      }

      this.onLocationSelect(location);

    }


  }


  focusPostEvent() {

    this.createEmptyPost();
    this.newPost = true;


  }

  createNewPost(postType: CommonItem, company: number) {
    this.currentUserId = +localStorage.getItem('user_id');
    this.postType = postType;
    this.company = company;
    this.focusPostEvent();

  }

  clearPost() {
    this.newPost = false;
    this.post = null;
    this.postType = null;
  }

  createEmptyPost() {

    const post = new Post();
    post.published = false;
    post.company = this.company;
    if (this.product) {
      post.product = this.product.id;
      post.product_default_details = this.product;
      post.product_details = this.product;
    }
    post.community = this.community;
    post.user = this.currentUserId;

    if (this.product) {
      if (this.product.category) {
        post.category = this.product.category;
        post.category_details = this.product.category_details;
      }
    }
    if (this.relatedCompany) {
      post.related_company = this.relatedCompany.id;
      post.related_company_default_details = this.relatedCompany;
      post.related_company_details = this.relatedCompany;
    }
    if (this.relatedProduct) {
      post.related_product = this.relatedProduct.id;
      post.related_product_default_details = this.relatedProduct;
      post.related_product_details = this.relatedProduct;
      if (this.relatedProduct.category) {
        post.category = this.relatedProduct.category;
        post.category_details = this.relatedProduct.category_details;
      }
    }
    if (this.relatedUser) {
      post.related_user = this.relatedUser.user_profile.user_id;
      post.related_user_data = this.relatedUser;

    }


    if (this.postType) {
      post.type = this.postType.id;
      post.type_details = this.postType;
    } else {
      post.type_details = new CommonItem();
      post.type_details.id = this.defaultPostTypeId;
      post.type_details.code = this.defaultPostTypeCode;
      this.postType = post.type_details;


    }

    post.images = [];
    post.documents = [];
    post.post_request_positions = [];
    post.attributes = [];
    if (this.category) {
      post.category = this.category.id;
      post.category_details = this.category;
    }

    this.post = post;


  }


  onTypeSelect(event) {
    this.post.type_details = event;
    this.post.type = event.id;
  }


  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.post.country = location.country.id;
      } else {
        this.post.country = null;
      }
      this.post.country_details = location.country;
      if (location.city) {
        this.post.city = location.city.id;
      } else {
        this.post.city = null;
      }
      this.post.city_details = location.city;
    }

  }


  onCanceled() {
    this.newPost = false;
    this.post = null;
    this.canceled.emit();
  }

  onPostPublished(event) {

    const checkLocation = this.locationComponent.checkLocationName();

    if (checkLocation) {
      this.processDialogComponent.show();
      this.post = event;


      this.post.published = true;

      const endpoint = `${'create-post'}`;

      this.service.createItem(endpoint, this.post)
      .then(post => {
          // this.app.newTimestamp();
          this.post = post;
          this.processDialogComponent.close();


          this.newPost = false;

          this.postCreated.emit(this.post);
          this.signalService.createNewPost(this.post);
          this.signalService.refreshTimeStamp();

          this.standardMessageService.addMessage({
            severity: 'success',
            summary: 'Post',
            detail: 'Successfully published'
          });

        })
        .catch(error => {
          this.handleError(error);
        });




    } else {
        this.editPostComponent.nativeElement.createdNewContent = true;
    }
  }


  onTypeSelected(type: CommonItem) {
    this.editPostComponent.nativeElement.newPostType = type;
  }

  onPostNotPublished() {

    this.postNotPublished.emit();
  }


  private handleError(error: any): void {

    this.standardMessageService.addMessage({
      severity: 'error',
      summary: 'An error occurred',
      detail: error
    }, false);


  }

}
