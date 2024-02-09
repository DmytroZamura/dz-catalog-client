import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {cutPostUrl, Post} from '../../post';
import {UrlPreview} from '../../../common/url-preview/url-preview';
import {Subscription} from 'rxjs';
import {SignalService} from '../../../signal.service';

@Component({
  selector: 'app-offering-post',
  templateUrl: './offering-post.component.html',
  styleUrls: ['./offering-post.component.css']
})
export class OfferingPostComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @Input() urlPreview: UrlPreview;
  @Input() currentUserId = 0;
  @Input() truncateComment = true;
  @Input() isBrowser = true;
  @Input() truncateWords = 15;
  @Input() isMobile = true;
  @Output() linkClicked = new EventEmitter<void>();
  @Output() showMoreClicked = new EventEmitter<void>();
  @Output() imagePreviewOpened = new EventEmitter<void>();

  private respondSubscription: Subscription;
  price: number;
  priceFrom: number;
  oldPrice: number;
  oldPriceFrom: number;

  show_details = false;
  comment: string;
  showUrlImage: boolean;


  constructor(private signalService: SignalService) {
  }

  ngOnInit() {
    if (!this.truncateComment) {
      this.truncateWords = 3000;
      this.show_details = true;
    }
    this.showUrlImage = !(this.post.images.length > 0);
    this.cutCommentUrl();

    if (this.post.post_offering.discount_price) {
      this.price = this.post.post_offering.discount_price;
      this.priceFrom = this.post.post_offering.discount_price_from;
      this.oldPrice = this.post.post_offering.price;
      this.oldPriceFrom = this.post.post_offering.price_from;
    } else {
      this.price = this.post.post_offering.price;
      this.priceFrom = this.post.post_offering.price_from;
    }

    if (this.post.admin_status) {

      this.respondSubscription = this.signalService.newPostRespond.subscribe(respond => {

        if (respond.post === this.post.id) {
          this.post.eventsqty.new_responds = this.post.eventsqty.new_responds + 1;
          this.post.eventsqty.responds = this.post.eventsqty.responds + 1;
        }


      });
    }

  }

  ngOnDestroy() {


    if (this.respondSubscription) {
      this.respondSubscription.unsubscribe();
      this.respondSubscription = null;
    }
  }

  cutCommentUrl() {

    if (this.post.url && this.post.comment) {
     this.comment = cutPostUrl(this.post.url, this.post.comment);
    } else {
      this.comment = this.post.comment;
    }
  }


  showDetails() {
    this.show_details = true;
    this.onShowMoreClicked();
  }


  onLinkClicked() {
    this.linkClicked.emit();
  }

  onShowMoreClicked() {
    this.showMoreClicked.emit();
  }


  onImagePreview() {
    this.imagePreviewOpened.emit();
  }


}
