import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, OnInit, Inject, ViewChild} from '@angular/core';

import {AppComponent} from './app.component';
import {GeneralService} from './general/general.service';
import {AppFilterService} from './app-filter.service';
import {OnDestroy} from '@angular/core';

import {BrowserService} from './browser.service';


import {Subscription} from 'rxjs';
import {SignalService} from './signal.service';



@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit, OnDestroy {



  @ViewChild('topButtons') topButtonsComponent: any;
  isBrowser = false;

  keyword = '';

  private interfaceSubscription: Subscription;




  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
              public app: AppComponent, private generalService: GeneralService,
              private signalService: SignalService,
              private filterService: AppFilterService, private browserService: BrowserService) {


    this.isBrowser = browserService.isBrowser;




  }

  ngOnInit() {


    if (this.isBrowser) {
      // this.getCreateMenuLabels();

      this.interfaceSubscription = this.signalService.newInterfaceLanguage.subscribe(lang => {
        this.app.lang = lang;

        if (this.topButtonsComponent) {
          this.topButtonsComponent.nativeElement.newLanguage = lang;
        }
        // this.getCreateMenuLabels();
        this.app.getPostTypes(lang);
        // this.app.refreshPostTypes = true;



      });
    }


  }



  showNotifications() {
    this.app.showNotificationsBar();
  }


  ngOnDestroy() {
    if (this.interfaceSubscription) {
      this.interfaceSubscription.unsubscribe();
      this.interfaceSubscription = null;
    }

  }




}
