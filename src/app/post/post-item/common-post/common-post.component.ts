import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {cutPostUrl, Post} from '../../post';

import {UrlPreview} from '../../../common/url-preview/url-preview';
import {CompanyShort} from '../../../company/company';
import {ProductShort} from '../../../product/product';


@Component({
  selector: 'app-common-post',
  templateUrl: './common-post.component.html',
  styleUrls: ['./common-post.component.css']
})
export class CommonPostComponent implements OnInit {


  @Input() post: Post;
  @Input() urlPreview: UrlPreview;
  @Input() currentUserId = 0;
  @Input() currencyCode = 'USD';
  @Input() truncateNumber = 65;
  @Input() truncateWords = 15;
  @Input() externalLink = true;
  @Input() locale = 'en';
  @Input() isBrowser = true;
  @Input() isMobile = true;
  @Input() truncateComment = true;
  @Output() linkClicked = new EventEmitter<void>();
  @Output() profileClicked = new EventEmitter<void>();
  @Output() showMoreClicked = new EventEmitter<void>();
  @Output() voted = new EventEmitter<void>();
  @Output() imagePreviewOpened = new EventEmitter<void>();


  comment: string;
  showUrlImage: boolean;
  relatedCompanyDetails: CompanyShort;
  relatedProductDetails: ProductShort;
  rating: number;

  constructor() {
  }

  ngOnInit() {
    if (!this.truncateComment) {
      this.truncateWords = 3000;
    }

    if (this.post.related_company) {
      if (this.post.related_company_details.name) {
        this.relatedCompanyDetails = this.post.related_company_details;
      } else {
        this.relatedCompanyDetails = this.post.related_company_default_details;
      }
    }

    if (this.post.related_product) {
      if (this.post.related_product_details.name) {
        this.relatedProductDetails = this.post.related_product_details;
      } else {
        this.relatedProductDetails = this.post.related_product_default_details;
      }
    }

    if (this.post.type_details.code === 'review' && this.post.post_review) {
      this.rating = this.post.post_review.rating;
    }


    this.showUrlImage = !(this.post.images.length > 0);
    this.cutCommentUrl();

  }


  cutCommentUrl() {


    if (this.post.url && this.post.comment) {

      this.comment = cutPostUrl(this.post.url, this.post.comment);

    } else {
      this.comment = this.post.comment;
    }
  }

  onLinkClicked() {
    this.linkClicked.emit();
  }

  onProfileClicked() {
    this.profileClicked.emit();
  }

  onShowMoreClicked() {
    this.showMoreClicked.emit();
  }


  onVoteClicked() {
    this.voted.emit();
  }

   onImagePreview() {
    this.imagePreviewOpened.emit();
  }


}
