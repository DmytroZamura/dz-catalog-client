import {Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';

import {Router} from '@angular/router';
import {AppService} from '../../app.service';
import Auth from '@aws-amplify/auth';
import {interval, Subscription} from 'rxjs';


@Component({
  selector: 'app-app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.css']
})
export class AppAuthComponent implements OnInit, OnDestroy {
  subscription: Subscription;


  @Output() signedin = new EventEmitter<string>();
  @Output() deleteSession = new EventEmitter<void>();

  constructor(private router: Router, private ngZone: NgZone, private appService: AppService) {
  }

  ngOnInit(): void {

    if (!this.appService.token) {
      this.setSession();
    }

    const source = interval(1000 * 60 * 10); // 10 minutes
    this.subscription = source.subscribe(val => this.refreshSession());

  }

  setSession() {

    Auth.currentSession()
      .then(data => {
        console.log('refresh');
        this.appService.token = data.getIdToken().getJwtToken();
        if (!this.appService.user) {

          Auth.currentAuthenticatedUser().then(authData => {

            this.signedin.emit(authData.username);

          })
            .catch(() => {

              this.appService.initRoutings();
              this.deleteSession.emit();


            });
        }
      })
      .catch(err => {

        console.log(err);
        this.deleteSession.emit();
        this.appService.initRoutings();


      });
  }


  @Input() set runLogout(logout: boolean) {

    this.logout();

  }

  private logout(): void {

    console.log('logout');
    Auth.signOut({global: true})
      .then(data => {


        if (!this.appService.user.includes('Google')) {
          this.appService.user = null;
          this.ngZone.run(() => this.router.navigate(['/auth'])).then();

        } else {
          this.appService.user = null;
        }


        // this.router.navigate(['/auth']);
      })
      .catch(err => console.log(err));


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  async refreshSession() {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(currentSession.getRefreshToken(), (err, session) => {
          console.log('refresh');
        // const {idToken, refreshToken, accessToken} = session;

        this.appService.token = session.getIdToken().getJwtToken();

        // do whatever you want to do now :)
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
  }

}
