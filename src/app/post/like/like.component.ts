import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {PostCommentLike, PostLike} from './like';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() likeStatus = false;
  @Input() likesCount: number;
  @Input() post: number;
  @Input() comment: number;
  @Input() user: number;
  @Input() locale = 'en';
  @Output() likeStatusChanged = new EventEmitter<boolean>();
  @Output() showDialog = new EventEmitter<any>();




  constructor(private service: GeneralService,
              public app: AppComponent) {
  }

  ngOnInit() {
  }


  onLikeClick() {

    if (this.app.appService.isAuthenticated()) {
      if (this.post) {
        const like = new PostLike();
        like.post = this.post;
        like.user = this.user;

        const url = `${'create-post-like'}`;

        this.service.createItem(url, like)
          .then(res => {
            this.app.newTimestamp();
            this.likeStatus = true;
            this.likeStatusChanged.emit(true);

          })
          .catch(error => {
            console.log(error);
          });


      }

      if (this.comment) {
        const like = new PostCommentLike();
        like.comment = this.comment;
        like.user = this.user;

        const url = `${'create-post-comment-like'}`;

        this.service.createItem(url, like)
          .then(res => {
            this.app.newTimestamp();
            this.likeStatus = true;
            this.likeStatusChanged.emit(true);

          })
          .catch(error => {
            console.log(error);
          });


      }
    } else {
      this.app.appService.showAuthDialog = true;
    }


  }


  showLikes() {

    this.showDialog.emit({post: this.post, comment: this.comment, count: this.likesCount});



  }


  onLikeDeleteClick() {

    if (this.post) {
      const url = `${'delete-post-like/'}`;

      this.service.deleteItemByPk(url, this.post)
        .then(new_post => {
          this.app.newTimestamp();
          this.likeStatus = false;
          this.likeStatusChanged.emit(false);

        })
        .catch(error => {
          console.log(error);
        });


    }

    if (this.comment) {

      const url = `${'delete-post-comment-like/'}`;

      this.service.deleteItemByPk(url, this.comment)
        .then(new_post => {
          this.app.newTimestamp();
          this.likeStatus = false;
          this.likeStatusChanged.emit(false);

        })
        .catch(error => {
          console.log(error);
        });


    }

  }

}
