import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {TagService} from '../tag.service';
import {TagFollower} from '../tag';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-follow-tag-button',
  templateUrl: './follow-tag-button.component.html',
  styleUrls: ['./follow-tag-button.component.css']
})
export class FollowTagButtonComponent implements OnInit {
  @Input() tagId: number;
  @Input() userId: number;
  @Input() followStatus: boolean;

  @Output() msgPushed = new EventEmitter<any>();
  @Output() followStastusChanged = new EventEmitter<boolean>();
  loading = false;

  constructor(private tagService: TagService, private messageService: StandardMessageService) {
  }

  ngOnInit() {

  }


  followTag() {

    const newFollower = new TagFollower();
    newFollower.tag = this.tagId;
    newFollower.user = this.userId;
    this.loading = true;
    this.tagService.followTag(newFollower)
      .then(res => {
        this.loading = false;
        this.followStatus = true;
        this.followStastusChanged.emit(true);

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Hashtag',
          detail: 'You follow'
        });


      })
      .catch(error => {
        console.log(error);
      });
  }

  unfollowTag() {
    this.loading = true;
    this.tagService.unfollowTag(this.userId, this.tagId)
      .then(res => {
        this.loading = false;
        this.followStatus = false;
        this.followStastusChanged.emit(false);
         this.messageService.addMessage({
          severity: 'success',
          summary: 'Hashtag',
          detail: 'You unfollowed'
        });



      })
      .catch(error => {
        console.log(error);
      });
  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


}
