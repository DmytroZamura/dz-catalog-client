import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {AppComponent} from '../app.component';


import Auth, {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {ICredentials} from '@aws-amplify/core';
import {TranslateService} from '@ngx-translate/core';
import {ProcessDialogComponent} from '../common/process-dialog/process-dialog.component';
// import awsconfig from '../../aws-exports';


@Component({
  selector: 'app-awsauth',
  templateUrl: './awsauth.component.html',
  styleUrls: ['./awsauth.component.css']
})


export class AWSAuthComponent implements OnInit, OnDestroy {
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;

  msgs1: string;
  severity = 'info';
  signInForm = true;
  signUpForm = false;
  signUpConfirmationForm = false;
  forgotPasswordForm = false;
  newPasswordForm = false;


  isBrowser = false;

  name = '';
  password = '';
  firstName = '';
  lastName = '';
  code = '';
  user: any;

  public static socialSignIn(provider: CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              public app: AppComponent, private translate: TranslateService) {

    // this.app.appService.startAuth = true;
    this.app.appService.startAuth = true;
    this.isBrowser = isPlatformBrowser(this.platformId);
    // if (this.isBrowser) {
    //   Auth.configure(awsconfig);
    // }


    this.app.appService.setLanguage();


  }


  ngOnInit() {
    if (this.isBrowser) {
      this.app.setLocation();
    }
  }


  async signInWithGoogle() {

    const socialResult = await AWSAuthComponent.socialSignIn(AWSAuthComponent.GOOGLE);

  }


  login() {

    this.processDialogComponent.show();
    Auth.signIn(this.name, this.password)
      .then(data => {

        Auth.currentSession()
          .then(session => {
            this.app.appService.token = session.getIdToken().getJwtToken();
            this.app.appService.startAuth = true;
            this.app.setAuthState('signedin', data.username);
            this.processDialogComponent.close();

          })
          .catch(err => {

            this.processDialogComponent.close();
            this.translate.get('ALERTS.' + err.message).subscribe(res => {
              this.severity = 'error';
              this.msgs1 = res;


            });


          });


        // this.router.navigate(['/auth']);
      })
      .catch(err => {
        this.processDialogComponent.close();
        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });
      });


  }

  showSignUpForm() {
    this.msgs1 = null;
    this.signInForm = false;
    this.signUpForm = true;
    this.signUpConfirmationForm = false;
    this.forgotPasswordForm = false;
    this.newPasswordForm = false;
  }

  createAccount() {
    const user = {
      username: this.name,
      password: this.password,
      attributes: {
        email: this.name,
        name: this.firstName,
        family_name: this.lastName
      }
    };
    Auth.signUp(user)
      .then(data => {
        this.msgs1 = null;
        this.user = data;
        this.signInForm = false;
        this.signUpForm = false;
        this.signUpConfirmationForm = true;
        this.forgotPasswordForm = false;
        this.newPasswordForm = false;

      })
      .catch(err => {
        this.processDialogComponent.close();
        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });
      });
  }

  confirmSignUp() {

    Auth.confirmSignUp(this.user.user.username, this.code)
      .then(data => {

        this.login();

      })
      .catch(err => {

        this.processDialogComponent.close();
        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });
      });
  }


  goSignIn() {
    this.signInForm = true;
    this.signUpForm = false;
    this.signUpConfirmationForm = false;
    this.forgotPasswordForm = false;
    this.newPasswordForm = false;
  }

  resendCode() {
    Auth.resendSignUp(this.user.user.username)
      .then(data => {

        this.translate.get('ALERTS.You will receive a verification code').subscribe(res => {
          this.severity = 'info';
          this.msgs1 = res;


        });

      })
      .catch(err => {


        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });
      });
  }

  showResetPasswordForm() {
    this.msgs1 = null;
    this.signInForm = false;
    this.signUpForm = false;
    this.signUpConfirmationForm = false;
    this.forgotPasswordForm = true;
    this.newPasswordForm = false;
  }


  resetPassword() {
    Auth.forgotPassword(this.name)
      .then(data => {
        this.translate.get('ALERTS.You will receive a verification code').subscribe(res => {
          this.severity = 'info';
          this.msgs1 = res;


        });
        this.signInForm = false;
        this.signUpForm = false;
        this.signUpConfirmationForm = false;
        this.forgotPasswordForm = false;
        this.newPasswordForm = true;
      })
      .catch(err => {

        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });

      });
  }

  newPassword() {
    Auth.forgotPasswordSubmit(this.name, this.code, this.password)
      .then(data => {
        this.translate.get('ALERTS.Password successfully changed').subscribe(res => {
          this.severity = 'success';
          this.msgs1 = res;


        });
        this.signInForm = true;
        this.signUpForm = false;
        this.signUpConfirmationForm = false;
        this.forgotPasswordForm = false;
        this.newPasswordForm = false;
      })
      .catch(err => {
        this.translate.get('ALERTS.' + err.message).subscribe(res => {
          this.severity = 'error';
          this.msgs1 = res;


        });
      });
  }

  ngOnDestroy() {

    // if (this.isBrowser) {
    //   return onAuthUIStateChange;
    // }
  }

}
