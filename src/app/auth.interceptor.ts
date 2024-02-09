import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import { from } from 'rxjs';
// import 'rxjs/add/observable/fromPromise';

import {TranslateService} from '@ngx-translate/core';
// import Auth from '@aws-amplify/auth';
import { switchMap } from 'rxjs/operators';
import {AppService} from './app.service';


// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/operator/mergeMap';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  // static getSession(): Observable<any> {
  //   return from(Auth.currentSession());
  // }


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private translate: TranslateService, private appService: AppService) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userId = this.localStorage.getItem('user_id');
    let authReq;
    let locale = this.translate.currentLang;

    if (!locale) {
      locale = 'en';
    }

    authReq = request.clone({


        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Accept-Language', `${locale}`)

      });



    if (userId) {

       const tocken = this.appService.token;

          if (tocken) {

            if (!request.headers.has('Content-Type')) {
              authReq = request.clone({


                headers: request.headers
                  .set('Content-Type', 'application/json')
                  // .set('Authorization', `Bearer ${access_token}`)
                  .set('Authorization', `Bearer ${tocken}`)
                  // .set('accessToken', access_token)
                  .set('Accept-Language', `${locale}`)


              });
            } else {
              authReq = request.clone({


                headers: request.headers

                // .set('Authorization', `Bearer ${access_token}`)
                  .set('Authorization', `Bearer ${tocken}`)
                  // .set('accessToken', access_token)
                  .set('Accept-Language', `${locale}`)


              });

            }
          }



          return next.handle(authReq);

      // return AuthInterceptor.getSession()
      //   .pipe (switchMap((session: any) => {
      //
      //
      //     // const access_token = session.accessToken.getJwtToken();
      //
      //     const tocken = session.getIdToken().getJwtToken();
      //     if (tocken) {
      //
      //       if (!request.headers.has('Content-Type')) {
      //         authReq = request.clone({
      //
      //
      //           headers: request.headers
      //             .set('Content-Type', 'application/json')
      //             // .set('Authorization', `Bearer ${access_token}`)
      //             .set('Authorization', `Bearer ${tocken}`)
      //             // .set('accessToken', access_token)
      //             .set('Accept-Language', `${locale}`)
      //
      //
      //         });
      //       } else {
      //         authReq = request.clone({
      //
      //
      //           headers: request.headers
      //
      //           // .set('Authorization', `Bearer ${access_token}`)
      //             .set('Authorization', `Bearer ${tocken}`)
      //             // .set('accessToken', access_token)
      //             .set('Accept-Language', `${locale}`)
      //
      //
      //         });
      //
      //       }
      //     }
      //
      //
      //
      //     return next.handle(authReq);
      //
      //   }));
    } else {
      authReq = request.clone({


        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Accept-Language', `${locale}`)

      });

      return next.handle(authReq);
    }


  }


  // async getTocken() {
  //   try {
  //     const session = await Auth.currentSession();
  //     this.tocken = session.getIdToken().getJwtToken();
  //
  //
  //   } catch (err) {
  //
  //     this.tocken = null;
  //     this.localStorage.removeItem('user_id');
  //
  //   }
  // }


}
