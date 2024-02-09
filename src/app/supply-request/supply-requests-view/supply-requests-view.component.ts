import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {SupplyRequestsListComponent} from './supply-requests-list/supply-requests-list.component';
import {Subscription} from 'rxjs';
import {AppFilterService} from '../../app-filter.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-supply-requests-view',
  templateUrl: './supply-requests-view.component.html',
  styleUrls: ['./supply-requests-view.component.css']
})
export class SupplyRequestsViewComponent implements OnInit, OnDestroy {

  @ViewChild('list') listComponent: SupplyRequestsListComponent;

  currentUserId = 0;
  isBrowser = false;
  userType: string; // - supplier, customer
  companyId: number;
  firstRoleSelected = false;
  loading = false;
  private loadingSubscription: Subscription;
  private loadingFinishedSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private filterService: AppFilterService, public app: AppComponent,
              private activateRoute: ActivatedRoute, @Inject(LOCAL_STORAGE) private localStorage: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {


    this.app.appService.setLanguage();


    this.loadingSubscription = this.filterService.filterLoadingStarted.subscribe(loading => {

      this.loading = true;


    });

    this.loadingFinishedSubscription = this.filterService.filterLoadingFinished.subscribe(loading => {

      this.loading = false;


    });


    const companyId = +this.activateRoute.snapshot.params['company'];

    if (companyId) {
      this.companyId = companyId;
    }

    this.userType = this.activateRoute.snapshot.params['userType'];


    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }

    this.activateRoute.params.subscribe(routeParams => {

      if (this.companyId !== routeParams.company || this.userType !== routeParams.userType) {

        if (routeParams.company) {
          this.companyId = +routeParams.company;
        }
        this.userType = routeParams.userType;
      }
      if (this.firstRoleSelected) {
        if (this.companyId) {
          this.listComponent.changeListMainFilter(this.companyId, this.userType);
        } else {
          this.listComponent.changeListMainFilter(null, this.userType);
        }
      }
    });


  }

  ngOnDestroy() {
    if (this.loadingFinishedSubscription) {
      this.loadingFinishedSubscription.unsubscribe();
      this.loadingFinishedSubscription = null;
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
      this.loadingSubscription = null;
    }
  }


  onRoleSelect(event) {
    if (event.user) {
      this.listComponent.changeListMainFilter(null, this.userType);
      this.companyId = null;
    } else {
      this.listComponent.changeListMainFilter(event.id, this.userType);
      this.companyId = event.id;

    }
    this.firstRoleSelected = true;

  }

}
