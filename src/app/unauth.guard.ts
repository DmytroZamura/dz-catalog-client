import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
// import Auth from '@aws-amplify/auth';
import {AppService} from './app.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private _router: Router, private appService: AppService, private translate: TranslateService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.appService.isAuthenticated()) {
      this._router.navigate(['/feed/']);
      return false;
    } else {
      return true;
    }

    // return Auth.currentAuthenticatedUser()
    //   .then(() => {
    //     this._router.navigate(['/feed/']);
    //     return false;
    //   })
    //   .catch(() => {
    //     return true;
    //   });
  }
}
