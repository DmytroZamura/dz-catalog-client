import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Hub} from '@aws-amplify/core';
import {AppComponent} from '../../app.component';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

import Auth from '@aws-amplify/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public app: AppComponent, @Inject(LOCAL_STORAGE) private localStorage: any) {


    this.app.appService.startAuth = true;
      // Used for listening to login events
      Hub.listen('auth', ({payload: {event, data}}) => {


        if (event === 'cognitoHostedUI') {
          Auth.currentSession()
            .then(session => {
              this.app.appService.token = session.getIdToken().getJwtToken();
              this.app.appService.startAuth = true;
              this.app.setAuthState(event, data.username);


            })
            .catch(err => {

              console.log(err);


            });


        }
      });

      this.app.appService.setLanguage();

  }

  ngOnInit() {
  }

}
