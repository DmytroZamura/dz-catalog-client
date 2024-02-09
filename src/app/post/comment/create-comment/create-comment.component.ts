import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UrlPreview} from '../../../common/url-preview/url-preview';
import {UrlPreviewComponent} from '../../../common/url-preview/url-preview.component';
import {PostComment} from '../comment';
import {TextEditorComponent} from '../../../common/text-editor/text-editor.component';
import {AppComponent} from '../../../app.component';
import {GeneralService} from '../../../general/general.service';
import {AppService} from '../../../app.service';


@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, OnChanges {
  @Input() post: number;
  @Input() parentComment: PostComment;
  @Input() user: number;
  @Input() updateMode = false;
  @Input() postComment: PostComment;
  @Output() commentPublished = new EventEmitter<PostComment>();
  @Output() msgPushed = new EventEmitter<any>();


  @ViewChild('previewurl') previewComponent: UrlPreviewComponent;
  @ViewChild('textEditor') textEditorComponent: TextEditorComponent;

  waitingForUrlPreview = false;
  published = false;
  currentUrl = '';
  dataInitialized = false;


  constructor(private service: GeneralService, public appService: AppService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.initCreateComment();
    }
  }

  initCreateComment() {
    if (!this.postComment) {
      this.postComment = new PostComment();
      this.postComment.user = this.user;
      this.postComment.post = this.post;
      if (this.parentComment) {

        if (this.parentComment.parent) {
          this.postComment.parent = this.parentComment.parent;
          if (this.parentComment.user_data) {
            this.postComment.text = '<a class="mention-link" href="/user-profile/' + this.parentComment.user_data.user_profile_default.slug + '">@'
              + this.parentComment.user_data.user_profile_default.first_name + ' ' + this.parentComment.user_data.user_profile_default.last_name + '</a>';


            // const parent_user_str = '@' + this.parentComment.user_data.user_profile_default.first_name + ' ' + this.parentComment.user_data.user_profile_default.last_name ;


            this.postComment.reply_to = this.parentComment.user_data.user_profile_default.user_id;
          }
        } else {
          this.postComment.parent = this.parentComment.id;
        }


      }


    }


    if (this.postComment.urlpreview) {
      this.currentUrl = this.postComment.urlpreview.url;
    }
  }

  mainLinkChanged(event) {
    if (event !== '') {
      if (!this.postComment.urlpreview) {
        this.postComment.urlpreview = new UrlPreview();
      }
      if (event !== this.postComment.urlpreview.url) {
        this.waitingForUrlPreview = true;
        this.previewComponent.getUrlPreview(event);
      }
    } else {
      this.postComment.urlpreview = null;
      this.currentUrl = '';

    }
  }


  onNewPreview(event) {
    this.waitingForUrlPreview = false;
    if (event) {
      this.postComment.urlpreview = event;
      this.currentUrl = event.url;

    } else {
      this.postComment.urlpreview = null;
      this.currentUrl = '';
    }

    if (this.published) {
      this.publishComment();
    }
  }

  onPublishComment() {

    this.published = true;
    if (!this.waitingForUrlPreview) {
      this.publishComment();
    }


  }


  publishComment() {


    if (!this.updateMode) {

      const url = `${'create-post-comment'}`;
      this.service.createItem(url, this.postComment)
        .then(comment => {
          this.appService.newTimestamp();
          this.published = false;
          this.postComment.text = '';
          this.postComment.urlpreview = null;
          this.postComment.image = null;
          this.postComment.image_details = null;
          this.commentPublished.emit(comment);

        })
        .catch(error => {
          console.log(error);
        });


    } else {
      const url = `${'update-post-comment/'}${this.postComment.id}`;
      this.service.updateItem(url, this.postComment)
        .then(comment => {
          this.appService.newTimestamp();
          this.published = false;

          this.postComment = comment;
          this.commentPublished.emit(comment);

        })
        .catch(error => {
          console.log(error);
        });


    }
  }


  onFileUpload(event) {
    this.postComment.image = event.id;
    this.postComment.image_details = event;
  }

  onImageDeleted() {
    this.postComment.image = null;
    this.postComment.image_details = null;
  }


  addEmoji(event: string) {

    this.textEditorComponent.addEmoji(event);


  }

  onStickerUpload(sticker) {
    this.textEditorComponent.addSticker(sticker);
  }


  addGiphy(event) {

    this.textEditorComponent.addImage(event);

  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }

}
