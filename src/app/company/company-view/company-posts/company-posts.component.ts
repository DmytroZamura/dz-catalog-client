import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {CompanyShort} from '../../company';

@Component({
  selector: 'app-company-posts',
  templateUrl: './company-posts.component.html',
  styleUrls: ['./company-posts.component.css']
})
export class CompanyPostsComponent implements OnInit {
  @Input() company: CompanyShort;
  @Input() admin = false;
  @Input() isBrowser = false;
  @Input() isMobile = false;


  currentUserId = 0;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any) {
  }

  ngOnInit() {
    this.currentUserId = +localStorage.getItem('user_id');
  }



}
