import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-likes-dialog',
  templateUrl: './likes-dialog.component.html',
  styleUrls: ['./likes-dialog.component.css']
})
export class LikesDialogComponent implements OnInit {
  @Input() showDialog: boolean;
  @Input() likesCount: number;
  @Input() post: number;
  @Input() comment: number;
  @Input() locale = 'en';

  constructor() {
  }

  ngOnInit() {
  }

  onShowDialog(params: any) {
    this.likesCount = params.count;
    this.post = params.post;
    this.comment = params.comment;
    this.showDialog = true;
  }

}
