import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';

import {Category} from '../../category/category';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-communities-home',
  templateUrl: './communities-home.component.html',
  styleUrls: ['./communities-home.component.css']
})
export class CommunitiesHomeComponent implements OnInit {

  currentUserId = 0;
  active_index = 0;
  selectedCategory: Category;

  isBrowser = false;


  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(LOCAL_STORAGE) private localStorage: any,
              public app: AppComponent,
              private messageService: StandardMessageService, private metaService: MetaService) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      if (this.currentUserId !== 0) {
        this.active_index = 1;
      }
    }
  }

  ngOnInit() {

  this.app.appService.setLanguage();


    this.metaService.addMetaTags('communities', null,
      null, null, null, null, false, null, null);

  }

  onCategorySelected(event) {
    this.selectedCategory = event;
  }




  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
