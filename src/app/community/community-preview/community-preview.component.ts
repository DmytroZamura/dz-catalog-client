import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CommunityShort} from '../community';

@Component({
  selector: 'app-community-preview',
  templateUrl: './community-preview.component.html',
  styleUrls: ['./community-preview.component.css']
})
export class CommunityPreviewComponent implements OnInit {
  @Input() communityDetails: CommunityShort;
  @Input() communityDefaultDetails: CommunityShort;
  @Input() truncate_number = 55;
  @Output() itemClicked = new EventEmitter<void>();
  community: CommunityShort;

  constructor() {
  }

  ngOnInit() {
    if (this.communityDetails.name) {
      this.community = this.communityDetails;
    } else {
      this.community = this.communityDefaultDetails;
    }
  }


  onItemClicked() {
    this.itemClicked.emit();
  }


}
