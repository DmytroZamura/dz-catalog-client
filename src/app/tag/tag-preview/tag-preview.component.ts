import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../tag';

@Component({
  selector: 'app-tag-preview',
  templateUrl: './tag-preview.component.html',
  styleUrls: ['./tag-preview.component.css']
})
export class TagPreviewComponent implements OnInit {
  @Input() tag: Tag;
  @Input() currentUserId = 0;
  @Input() buttonPosition = 'left';
  @Output() msgPushed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }


  onFollowStatusChanged(followStatus: boolean) {
    this.tag.follow_status = followStatus;
    if (followStatus) {
      this.tag.qty.followers = this.tag.qty.followers + 1;
    } else {
      this.tag.qty.followers = this.tag.qty.followers - 1;
    }

  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


}
