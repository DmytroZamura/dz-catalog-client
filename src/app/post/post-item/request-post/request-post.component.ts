import {Input, Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';


import {cutPostUrl, Post} from '../../post';
import {BrowserService} from '../../../browser.service';
import {UrlPreview} from '../../../common/url-preview/url-preview';
import {Subscription} from 'rxjs';
import {SignalService} from '../../../signal.service';


@Component({
  selector: 'app-request-post',
  templateUrl: './request-post.component.html',
  styleUrls: ['./request-post.component.css'],

})
export class RequestPostComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @Input() urlPreview: UrlPreview;
  @Input() currentUserId = 0;
  @Input() truncateComment = true;
  @Input() isBrowser = true;
  @Input() isMobile = true;
  @Input() truncateWords = 15;
  @Output() linkClicked = new EventEmitter<void>();
  @Output() showMoreClicked = new EventEmitter<void>();
  @Output() imagePreviewOpened = new EventEmitter<void>();

  private respondSubscription: Subscription;




  show_details = false;
  comment: string;
  showUrlImage: boolean;



  constructor( private signalService: SignalService) {

  }

  ngOnInit() {
    if (!this.truncateComment) {
      this.show_details = true;
      this.truncateWords = 3000;
    }

    this.showUrlImage = !(this.post.images.length > 0);
    this.cutCommentUrl();
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
