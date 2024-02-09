import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CompanyShort} from '../../company';

import {AppFilterService} from '../../../app-filter.service';
import {ActivatedRoute} from '@angular/router';
import {FilteredPostsListComponent} from '../../../post/filtered-posts-list/filtered-posts-list.component';



@Component({
  selector: 'app-company-posts-admin',
  templateUrl: './company-posts-admin.component.html',
  styleUrls: ['./company-posts-admin.component.css']
})
export class CompanyPostsAdminComponent implements OnInit {
  @Input() company: CompanyShort;
  @Input() isBrowser = false;
  @ViewChild('list') listComponent: FilteredPostsListComponent;


  paramsChecked = false;
  constructor(private filterService: AppFilterService, private activateRoute: ActivatedRoute) {
    const params = activateRoute.snapshot.queryParams;
    this.getUniversalFilter(params);
  }

  ngOnInit() {

  }




  getUniversalFilter(params: any) {
    this.filterService.getUniversalFilter(JSON.stringify(params), 'en')
      .then(res => {


        if (res) {
          if (this.isBrowser) {
            this.filterService.initNavigation(61, this.company.id, 'feed', false, res);
            this.paramsChecked = true;
          }
        }


      })
      .catch(error => {
        console.log(error);
      });
  }


}
