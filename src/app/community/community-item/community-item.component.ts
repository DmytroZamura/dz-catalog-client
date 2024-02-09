import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Community} from '../community';


@Component({
  selector: 'app-community-item',
  templateUrl: './community-item.component.html',
  styleUrls: ['./community-item.component.css']
})
export class CommunityItemComponent implements OnInit {
  @Input() community: Community;
  @Input() index: number;
  @Input() currentUserId: number;

  constructor() {
  }

  ngOnInit() {
  }





}
