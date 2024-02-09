import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID} from '@angular/core';

import {isPlatformBrowser} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-text-show-more',
  templateUrl: './text-show-more.component.html',
  styleUrls: ['./text-show-more.component.css']
})
export class TextShowMoreComponent implements OnInit {
  @Input() text: string;
  @Input() showSeeMore = true;
  @Input() richText = false;
  @Input() truncate_number = 350;
  @Input() truncateWords = 60;
  @Input() currentUserId = 0;
  @Input() isMobile = false;
  @Input() linkify = true;
  @Input() calcTruncateWords = true;
  @Output() showMoreClicked = new EventEmitter<void>();

  see_more = true;
  isBrowser = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private sanitization: DomSanitizer) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {

    // if (this.linkify && !this.richText) {
    //   this.text = this.linkifyService.linkify(this.text);
    // }

    if (this.richText && this.calcTruncateWords) {
      this.calculateTruncateWords();
    }

    this.checkSeeMore();
  }



  checkSeeMore() {
    if (this.showSeeMore) {
      if (this.richText) {
        const countwords = this.text.split(' ').length;
        if (countwords < this.truncateWords) {
          this.showSeeMore = false;
        }
      }
      if (!this.richText) {
        if (this.text.length < this.truncate_number) {
          this.showSeeMore = false;
        }
      }
    }

  }

  seeMore() {
    this.see_more = false;
    this.showMoreClicked.emit();
  }

  calculateTruncateWords() {

    let truncate = this.truncateWords;
    if (this.text) {
      const mention_count = (this.text.match(/mention-link/g) || []).length;
      if (mention_count > 0) {
        truncate = truncate + (8 * mention_count);
      }

      const tags_count = (this.text.match(/hashtag-link/g) || []).length;
      if (tags_count > 0) {
        truncate = truncate + (7 * tags_count);
      }
    }


    if (truncate > 30) {
      truncate = 30;
    }

    this.truncateWords = truncate;

  }


}
