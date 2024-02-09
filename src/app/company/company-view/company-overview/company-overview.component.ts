import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Company} from '../../company';


import {Router} from '@angular/router';
import {AppFilterService} from '../../../app-filter.service';
import {AppService} from '../../../app.service';


@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit {
  @Input() company: Company;
  @Input() user_id: number;
  @Input() currentUserId = 0;
  @Input() admin: false;
  @Input() isBrowser = false;
  @Input() language = 'en';




  constructor(private router: Router, private filterService: AppFilterService, public appService: AppService) {
  }


  ngOnInit() {
 this.filterService.initNavigation(6, null, 'companies');


  }


  onEditCompany() {
    this.router.navigate(['/company-admin/' + this.company.slug]);

  }



}
