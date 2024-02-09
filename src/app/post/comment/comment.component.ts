import {Input, Component, OnInit, Output, EventEmitter, Inject, ViewChild} from '@angular/core';
import {PostComment} from './comment';
import {CommentsListComponent} from './comments-list/comments-list.component';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '@ng-toolkit/universal';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  @Input() postComment: PostComment;
  @Input() user: number;
  @Input() editable = true;
  @Input() postCommentsPreview = false;
  @Input() locale = 'en';
  @Output() commentDeleted = new EventEmitter<boolean>();
  @Output() updatePostCommentQty = new EventEmitter<number>();
  @Output() msgPushed = new EventEmitter<any>();
  @Output() commentCreated = new EventEmitter<PostComment>();
  @ViewChild('list') listComponent: CommentsListComponent;
  showChildComments = false;
  showChildCreateCommentPanel = false;
  editMode = false;
  text: string;


  constructor(@Inject(DOCUMENT) private document: any, public app: AppComponent) {

  }

  ngOnInit() {
    if (this.postComment) {
      this.cutCommentUrl();
    }
  }

  cutCommentUrl() {
    if (this.postComment.urlpreview) {

      this.text = this.postComment.text.replace('>' + this.postComment.urlpreview.url, '>');

    } else {
      this.text = this.postComment.text;
    }
  }


  showComments() {
    this.showChildComments = true;
  }

  reply() {

    if (this.user) {

      this.showChildCreateCommentPanel = !this.showChildCreateCommentPanel;
      this.showChildComments = true;
      if (this.listComponent) {
        this.listComponent.showCreateComment(this.showChildCreateCommentPanel);
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }
  }

  onLikeChanged(status: boolean) {
    if (status) {
      this.postComment.eventsqty.likes = this.postComment.eventsqty.likes + 1;
    } else {
      this.postComment.eventsqty.likes = this.postComment.eventsqty.likes - 1;
    }
  }

  onUpdatePostCommentQty(qty: number) {
    this.updatePostCommentQty.emit(qty);
  }

  onChildCommentCreatedOrDeleted(status: boolean) {
    if (status) {
      this.postComment.eventsqty.comments = this.postComment.eventsqty.comments + 1;
      this.showChildCreateCommentPanel = false;
    } else {
      this.postComment.eventsqty.comments = this.postComment.eventsqty.comments - 1;
    }

  }

  delete() {
    this.commentDeleted.emit(true);
  }

  edit() {
    this.editMode = true;
  }

  onCommentPublished(comment: PostComment) {
    this.postComment = comment;
    this.cutCommentUrl();
    this.editMode = false;

  }

  onCommentCreated(comment: PostComment) {
    this.commentCreated.emit(comment);
  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


}
