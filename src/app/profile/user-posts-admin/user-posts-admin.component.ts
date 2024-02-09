import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {AppFilterService} from '../../app-filter.service';
import {ActivatedRoute} from '@angular/router';
import {FilteredPostsListComponent} from '../../post/filtered-posts-list/filtered-posts-list.component';

@Component({
  selector: 'app-user-posts-admin',
  templateUrl: './user-posts-admin.component.html',
  styleUrls: ['./user-posts-admin.component.css']
})
export class UserPostsAdminComponent implements OnInit {

  @Input() user_id: number;
   @ViewChild('list') listComponent: FilteredPostsListComponent;
  isBrowser: boolean;
  paramsChecked = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private filterService: AppFilterService, private activateRoute: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const params = activateRoute.snapshot.queryParams;
    this.getUniversalFilter(params);
  }

  ngOnInit() {

  }

   onPostCreated(event) {
    this.listComponent.onPostCreated(event);
  }


  getUniversalFilter(params: any) {
    this.filterService.getUniversalFilter(JSON.stringify(params), 'en')
      .then(res => {


        if (res) {
          if (this.isBrowser) {
            this.filterService.initNavigation(71, this.user_id, 'feed', false, res);
            this.paramsChecked = true;
          }
        }


      })
      .catch(error => {
        console.log(error);
      });
  }


}
