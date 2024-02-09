import {Component, Inject, OnInit} from '@angular/core';
import {BrowserService} from '../browser.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {MetaService} from '../meta.service';
import {ActivatedRoute} from '@angular/router';
import {AppComponent} from '../app.component';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  isBrowser = false;
  chatID: number;
  currentUserId = 0;


  constructor(private browserService: BrowserService, @Inject(LOCAL_STORAGE) private localStorage: any,
              public app: AppComponent,
              private metaService: MetaService, private activateRoute: ActivatedRoute) {
    this.isBrowser = browserService.isBrowser;

  }

  ngOnInit() {


  this.app.appService.setLanguage();


    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }
    this.chatID = +this.activateRoute.snapshot.params['id'];
    this.metaService.addMetaTags('messaging', null,
      null, null, null, null, false, null, null);
  }




}
