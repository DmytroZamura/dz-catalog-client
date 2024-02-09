import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  @Input() user_id: number;
  @Input() admin = false;
  @Input() isBrowser = false;
  @Input() isMobile = false;

  currentUserId = 0;

  constructor() {
  }

  ngOnInit() {
    this.currentUserId = +localStorage.getItem('user_id');
  }


}
