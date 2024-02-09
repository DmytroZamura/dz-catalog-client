import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../post';
import {Subscription} from 'rxjs';
import {SignalService} from '../../../signal.service';
import {UrlPreview} from '../../../common/url-preview/url-preview';


@Component({
  selector: 'app-jop-post',
  templateUrl: './jop-post.component.html',
  styleUrls: ['./jop-post.component.css']
})
export class JopPostComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @Input() currentUserId = 0;
  @Input() isBrowser = true;
  @Input() isMobile = true;
  @Output() linkClicked = new EventEmitter<void>();
  @Output() showMoreClicked = new EventEmitter<void>();
  @Output() imagePreviewOpened = new EventEmitter<void>();
  @Input() truncateWords = 15;
  @Output() applyJob = new EventEmitter<any>();
  @Input() urlPreview: UrlPreview;
  @Input() truncateComment = true;


  comment: string;
  showUrlImage: boolean;
  private respondSubscription: Subscription;


  constructor(private signalService: SignalService) {
  }

  ngOnInit() {

    if (!this.truncateComment) {
      this.truncateWords = 3000;
    }

    this.showUrlImage = !(this.post.images.length > 0);
    this.cutCommentUrl();


    if (this.post.admin_status) {

      this.respondSubscription = this.signalService.newPostRespond.subscribe(respond => {

        if (respond.post === this.post.id) {
          this.post.eventsqty.new_applicants = this.post.eventsqty.new_applicants + 1;
          this.post.eventsqty.applicants = this.post.eventsqty.applicants + 1;
        }


      });
    }
  }

  cutCommentUrl() {
    this.comment = this.post.comment;
  }


  ngOnDestroy() {


    if (this.respondSubscription) {
      this.respondSubscription.unsubscribe();
      this.respondSubscription = null;
    }
  }


  onApply() {
    this.applyJob.emit({'post': this.post.id, 'resumeRequred': this.post.post_job.resume_required});
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
