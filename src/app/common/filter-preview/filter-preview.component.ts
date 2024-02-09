import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostFeedFilter} from '../../post/post';

@Component({
  selector: 'app-filter-preview',
  templateUrl: './filter-preview.component.html',
  styleUrls: ['./filter-preview.component.css']
})
export class FilterPreviewComponent implements OnInit {
  @Input() filter: PostFeedFilter;
  @Input() truncateNumber = 30;
  @Output() filterSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.filterSelected.emit();
  }

}
