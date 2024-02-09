import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {NavigationEnd, Router} from '@angular/router';
import {UtilsService} from '../utils.service';
import {SearchBoxComponent} from '../common/search-box/search-box.component';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-top-buttons',
  templateUrl: './top-buttons.component.html',
  styleUrls: ['./top-buttons.component.css']
})
export class TopButtonsComponent implements OnInit {
  @ViewChild('searchBox') searchComponent: SearchBoxComponent;
  keyword = '';
  companyPageLabel = 'Company page';
  productLabel = 'Product or service';
  publishLabel = 'Publish';
  postLabel = 'Post';
  offeringLabel = 'Offering';
  jobLabel = 'Job';
  requestLabel = 'Request';
  articleLabel = 'Article';
  items: MenuItem[];

  constructor(public appService: AppService, public router: Router, private translate: TranslateService) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Navigation Ended Successfully.

        const urlWithoutParams = UtilsService.getCurrentPrimeRout(this.router.parseUrl(event.url));

        if (urlWithoutParams !== 'keyword' && this.searchComponent) {
          this.searchComponent.clearKeyword();
        }

      }
    });
  }

  ngOnInit(): void {
    this.getCreateMenuLabels();
  }

   @Input() set newLanguage(lang: string) {

    this.getCreateMenuLabels();

  }


  onSearch(keyword: string) {

    this.router.navigate(['/keyword/' + keyword]);
  }


  getCreateMenuLabels() {
    this.translate.get('CREATE.Company page').subscribe(res => {

      this.companyPageLabel = res;

    });

    this.translate.get('CREATE.Product or service').subscribe(res => {

      this.productLabel = res;

    });

    this.translate.get('CREATE.Post').subscribe(res => {

      this.postLabel = res;

    });

    this.translate.get('CREATE.Offering').subscribe(res => {

      this.offeringLabel = res;

    });

    this.translate.get('CREATE.Job').subscribe(res => {

      this.jobLabel = res;

    });

    this.translate.get('CREATE.Article').subscribe(res => {

      this.articleLabel = res;

    });

    this.translate.get('CREATE.Request').subscribe(res => {

      this.requestLabel = res;
      this.createItems();
    });
  }

  createItems() {
    this.items = [
      {
        label: this.companyPageLabel, icon: 'pi pi-briefcase', command: () => {
          this.appService.newObject('company');
        }
      },
      {
        label: this.productLabel, icon: 'pi pi-th-large', command: () => {
          this.appService.newObject('product');

        }
      },
      {
        label: this.postLabel, icon: 'pi pi-share-alt', command: () => {

          this.appService.newObject('post');

        }
      },
      {
        label: this.offeringLabel, icon: 'pi pi-dollar', command: () => {
          this.appService.newObject('offering');

        }
      },
      {
        label: this.jobLabel, icon: 'pi pi-users', command: () => {
          this.appService.newObject('job');

        }
      },
      {
        label: this.requestLabel, icon: 'pi pi-info', command: () => {
          this.appService.newObject('request');
        }
      },
      {
        label: this.articleLabel, icon: 'pi pi-book', command: () => {
          if (this.appService.isAuthenticated()) {
            this.appService.newObject('article');

          } else {
            this.appService.showAuthDialog = true;
          }
        }
      }
    ];
  }

}
