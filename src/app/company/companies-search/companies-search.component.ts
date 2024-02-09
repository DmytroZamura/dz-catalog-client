import {Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Category} from '../../category/category';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {ActivatedRoute} from '@angular/router';
import {AppFilterService} from '../../app-filter.service';
import {UniversalFilter} from '../../common/universal-filter';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';
import {ItemsListAgileComponent} from '../../general/items-list-agile/items-list-agile.component';

@Component({
  selector: 'app-companies-search',
  templateUrl: './companies-search.component.html',
  styleUrls: ['./companies-search.component.css']
})
export class CompaniesSearchComponent implements OnInit {
  @ViewChild('listView') listViewComponent: ItemsListAgileComponent;
  isBrowser = false;
  currentUserId = 0;
  activeIndex = 0;
  selectedCategory: Category;
  language = 'en';
  urlLanguage: string;
  paramsChecked = false;
  appliedFilter: UniversalFilter;


  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(LOCAL_STORAGE) private localStorage: any,
              private metaService: MetaService, public app: AppComponent, private service: GeneralService,
              private activateRoute: ActivatedRoute, private filterService: AppFilterService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const language = activateRoute.snapshot.params['language'];

    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      this.app.appService.setLanguage();
      this.language = localStorage.getItem('language_code');
    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
    }

    if (this.currentUserId !== 0) {
      this.activeIndex = 1;
    }

    const params = activateRoute.snapshot.queryParams;
    this.getUniversalFilter(params);

  }

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {

        this.app.appService.checkWelcomeMessage();

      }, 2500);
    }

  }

  getUniversalFilter(params: any) {
    const url = `${'get-universal-filter/'}${JSON.stringify(params)}${'/'}${this.language}`;
    this.service.getItem(url)
      .then(res => {
        this.metaService.addMetaTags('companies', null,
          this.urlLanguage, null, null, null, true, null, res);
        if (res) {
          // if (this.isBrowser) {
          //   this.filterService.initNavigation(2, null, 'companies', false, res);
          //
          // }
          this.appliedFilter = res;
          this.paramsChecked = true;
        }


      })
      .catch(error => {
        console.log(error);
      });


  }

  onCategorySelected(event) {
    this.selectedCategory = event;
  }


}
