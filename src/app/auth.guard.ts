import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
// import Auth from '@aws-amplify/auth';


import {isPlatformBrowser} from '@angular/common';

import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AppService} from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isBrowser = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router, private appService: AppService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  //
  // canActivate( next: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot) {
  //
  //
  //
  //
  //   if (this.isBrowser) {
  //
  //     if (this.localStorage.getItem('user_id')) {
  //
  //       // logged in so return true
  //       return true;
  //     } else {
  //       this.router.navigate(['/auth/']);
  //       return false;
  //     }
  //
  //
  //   } else {
  //
  //     return false;
  //   }
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.appService.isAuthenticated()) {
      return true;
    } else {
       this.router.navigate(['/auth/']);
        return false;
    }
    // return Auth.currentAuthenticatedUser().then(() => {
    //   return true;
    // })
    //   .catch(() => {
    //     this.router.navigate(['/auth/']);
    //     return false;
    //   });
  }
}
