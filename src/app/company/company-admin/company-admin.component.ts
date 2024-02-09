import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../company';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';

import {BrowserService} from '../../browser.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AppFilterService} from '../../app-filter.service';
import {MetaService} from '../../meta.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.css']
})
export class CompanyAdminComponent implements OnInit {
  isBrowser = false;
  slug: string;
  company: Company;
  currentUserId = 0;
  items: MenuItem[];
  activeTab = 0;
  isMobile = false;
  language = 'en';


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private browserService: BrowserService,
              private metaService: MetaService,   private activateRoute: ActivatedRoute,
              private service: GeneralService, private deviceService: DeviceDetectorService,

              private router: Router, private translate: TranslateService,
              public app: AppComponent,
              private filterService: AppFilterService, private messageService: StandardMessageService) {
    this.isBrowser = browserService.isBrowser;
    this.slug = activateRoute.snapshot.params['slug'];
    const tab = +activateRoute.snapshot.params['tab'];
    if (tab && (tab >= 0 && tab <= 3)) {
      this.activeTab = tab;
    }
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {

    this.app.appService.setLanguage();
    this.language = this.translate.currentLang;

    if (this.isBrowser) {


      this.currentUserId = +localStorage.getItem('user_id');

      this.items = [];
      this.translate.get('COMPANY.Company Overview').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 0;

          }
        });

      });

      this.translate.get('GENERAL.Timeline').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 1;

          }
        });

      });

      this.translate.get('PRODUCT.Products/Services').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 2;

          }
        });

      });

      this.translate.get('GENERAL.Users Administration').subscribe(res => {
        this.items.push({
          label: res,
          command: (event: any) => {
            this.activeTab = 3;

          }
        });

      });

      if (this.isBrowser) {
        this.initData();
      }
    }

    this.metaService.addMetaTags('company-admin', null,
      null, null, null, null, false, null, null);

  }


  initData(): void {
        const url = `${'get-company-by-slug/'}${this.slug}`;
        this.service.getItem(url)
    .then(res => {

        this.company = res;

        if (this.activeTab !== 1) {
          this.filterService.initNavigation(6, this.company.id, 'products');
        }


      })
      .catch(error => {
        this.handleError(error);
      });



  }




  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}
