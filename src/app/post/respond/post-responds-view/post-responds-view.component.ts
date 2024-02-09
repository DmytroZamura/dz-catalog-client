import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {PostRespondsListComponent} from './post-responds-list/post-responds-list.component';
import {ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-post-responds-view',
  templateUrl: './post-responds-view.component.html',
  styleUrls: ['./post-responds-view.component.css']
})
export class PostRespondsViewComponent implements OnInit {
  @ViewChild('list') listComponent: PostRespondsListComponent;
  currentUserId = 0;
  isBrowser = false;
  postType: string; // - job, offering, request
  userType: string; // - owner, responder
  companyId: number;
  firstRoleSelected = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activateRoute: ActivatedRoute,
              @Inject(LOCAL_STORAGE) private localStorage: any, public app: AppComponent) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {

    this.app.appService.setLanguage();


    const companyId = +this.activateRoute.snapshot.params['company'];

    if (companyId) {
      this.companyId = companyId;
    }

    this.postType = this.activateRoute.snapshot.params['postType'];
    this.userType = this.activateRoute.snapshot.params['userType'];


    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }

    this.activateRoute.params.subscribe(routeParams => {

      if (this.companyId !== routeParams.company || this.postType !== routeParams.postType) {

        if (routeParams.company) {
          this.companyId = +routeParams.company;
        }
        this.postType = routeParams.postType;
        this.userType = routeParams.userType;
      }

      if (this.firstRoleSelected) {
        if (this.companyId) {
          this.listComponent.changeMainFilter(this.companyId, this.postType, this.userType);
        } else {
          this.listComponent.changeMainFilter(null, this.postType, this.userType);
        }
      }
    });


  }


  onRoleSelect(event) {

    if (event.user) {
      this.listComponent.changeMainFilter(null, this.postType, this.userType);
      this.companyId = null;
    } else {
      this.listComponent.changeMainFilter(event.id, this.postType, this.userType);
      this.companyId = event.id;

    }

    this.firstRoleSelected = true;


  }


}
