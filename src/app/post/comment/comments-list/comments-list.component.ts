import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {PostComment} from '../comment';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ConfirmationService} from 'primeng/api';

import {isPlatformBrowser} from '@angular/common';
import {StandardMessageService} from '../../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {SignalService} from '../../../signal.service';
import {Activity, AggregatedFeedItem, Post} from '../../post';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {AppComponent} from '../../../app.component';
import {GeneralService} from '../../../general/general.service';


@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
  providers: [ConfirmationService]
})
export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() post: number;
  @Input() showComments = true;
  @Input() activityComments: Activity[];
  @Input() parentComment: PostComment;
  @Input() user: number;
  @Input() showCreateCommentPanel = false;
  @Input() postCommentsPreview = false;
  @Input() locale = 'en';

  @Output() updatePostCommentQty = new EventEmitter<number>();
  @Output() commentCreatedOrDeleted = new EventEmitter<boolean>();
  @Output() commentPublished = new EventEmitter<PostComment>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  comments: PostComment[];
  page = 0;

  isBrowser = false;
  showLoadComments = false;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  loading = false;
  private newActivitiesSubscription: Subscription;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private service: GeneralService,
              @Inject(LOCAL_STORAGE) private localStorage: any, private confirmationService: ConfirmationService,
              private messageService: StandardMessageService, private translate: TranslateService, public app: AppComponent,
              private signalService: SignalService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {


    if (this.isBrowser) {
      this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
        this.deleteConfirmationLabel = res;

      });

      this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
        this.deleteMessageLabel = res;

      });


      if (this.showComments) {
        this.initComments();
      }


    }
  }


  initComments() {
     this.newActivitiesSubscription = this.signalService.newTimeLineActivity.subscribe(activity => {
        this.addCommentActivity(activity);
      });

      this.getComments();
  }

  openComments(status: boolean) {

    if (!this.showComments && !this.comments) {
       this.newActivitiesSubscription = this.signalService.newTimeLineActivity.subscribe(activity => {
        this.addCommentActivity(activity);
      });

      this.getComments();
    }

    this.showComments = status;
  }

  ngOnDestroy() {

    if (this.newActivitiesSubscription) {
      this.newActivitiesSubscription.unsubscribe();
      this.newActivitiesSubscription = null;
    }
  }

  addCommentActivity(activity: AggregatedFeedItem) {

    if (activity.verb === 'comment') {
      const postId = activity.activities[0].target.id;

      if (postId === this.post) {

        const comment: PostComment = activity.activities[0].object;
        if (!this.parentComment && !comment.parent) {
          this.addComment(comment);
        }


        if (this.parentComment) {

          if (this.parentComment.id === comment.parent) {
            this.addComment(comment);
          }


        }
        if (!this.parentComment && comment.parent) {

          for (const item of this.comments) {
            if (item.id === comment.parent) {
              item.eventsqty.comments = item.eventsqty.comments + 1;
              break;
            }
          }
        }
      }

    }

    if (activity.verb === 'comment_like') {
      if (this.post === activity.activities[0].target.post) {
        for (const comment of this.comments) {
          if (comment.id === activity.activities[0].target.id) {
            comment.eventsqty.likes = comment.eventsqty.likes + 1;
            this.app.newTimestamp();
          }
        }
      }
    }


  }

  showCreateComment(show: boolean) {
    this.showCreateCommentPanel = show;
  }

  getComments(): void {

    let parentId = 0;
    if (this.parentComment) {
      parentId = this.parentComment.id;
    }
    this.loading = true;
    const url = `${'post-comments-by-page/'}${this.post}${'/'}${parentId}${'/'}${this.page}`;
    this.service.getItems(url)
    .then(comments => {
        this.loading = false;
        if (comments[0]) {

          if (!this.comments) {
            this.comments = [];

          }
          this.comments = this.comments.concat(comments);

          this.page = this.page + 1;


          // this.comments = comments;
        }

        this.showLoadComments = comments.length === 10;

      })
      .catch(error => {
        this.loading = false;
        this.handleError(error);
      });


  }


  onCommentDeleted(status: boolean, index: number) {


    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {
        this.processDialogComponent.show();

        const url = `${'delete-post-comment/'}`;

        this.service.deleteItemByPk(url, this.comments[index].id)
        .then(res => {
            this.processDialogComponent.close();
            this.updatePostCommentQty.emit(-1 - this.comments[index].eventsqty.comments);
            this.comments.splice(index, 1);
            this.commentCreatedOrDeleted.emit(false);

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Comment',
              detail: 'Successfully deleted'
            });


          })
          .catch(error => {
            this.handleError(error);
          });



      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });


  }

  onUpdatePostCommentQty(qty: number) {
    this.updatePostCommentQty.emit(qty);
  }

  addComment(comment: PostComment) {
    if (!this.comments) {
      this.comments = [];
    }
    this.app.newTimestamp();
    this.comments.push(comment);
  }

  addPublishedComment(comment: PostComment) {
    this.addComment(comment);

    this.commentCreatedOrDeleted.emit(true);

    this.updatePostCommentQty.emit(1);

    this.app.newTimestamp();
    this.messageService.addMessage({
      severity: 'success',
      summary: 'Comment',
      detail: 'Successfully published'
    });


  }

  onCommentPublished(comment: PostComment) {


    if (this.parentComment) {

      if (!this.parentComment.parent || this.postCommentsPreview) {

        this.addPublishedComment(comment);

      } else {
        this.commentPublished.emit(comment);
      }
    } else {
      this.addPublishedComment(comment);
    }

    if (this.parentComment) {
      this.showCreateCommentPanel = false;
    }
  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
