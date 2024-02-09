import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Profile} from '../../profile/profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-feed-preview',
  templateUrl: './user-feed-preview.component.html',
  styleUrls: ['./user-feed-preview.component.css']
})
export class UserFeedPreviewComponent implements OnInit {
  @Input() profile: Profile;
  @Input() user: number;
  @Input() greedView = false;
  @Input() acceptButton = false;
  @Input() locale = 'en';

  @Input() isMobile = false;
  @Input() canManage = false;

  @Output() profileDeleted = new EventEmitter<void>();
  @Output() accepted = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();
  @Output() itemClicked = new EventEmitter<void>();
  publications_total = 0;
  truncateNumber = 100;


  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.isMobile) {
      this.truncateNumber = 45;
    }
    this.publications_total = this.profile.eventsqty.requests + this.profile.eventsqty.publications + this.profile.eventsqty.jobposts + this.profile.eventsqty.offerings;
  }


  showProfile() {

    if (this.profile.is_active) {
      this.itemClicked.emit();
      this.router.navigate(['/user-profile/' + this.profile.slug + '/' + this.locale]);

    }

  }

  deleteProfile() {
    this.profileDeleted.emit();
  }

  acceptUser() {
    this.accepted.emit();
  }

  rejectUser() {
    this.rejected.emit();
  }


  onItemClicked() {

    this.itemClicked.emit();
  }


}
