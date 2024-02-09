import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonItem} from '../common-item';
import {UniversalFilter} from '../../common/universal-filter';
import {FilterNavigatorComponent} from '../../common/filter-navigator/filter-navigator.component';
import {LikesDialogComponent} from '../../post/likes-dialog/likes-dialog.component';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {DeviceDetectorService} from 'ngx-device-detector';
import {GeneralService} from '../general.service';
import {AppComponent} from '../../app.component';
import {TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-manage-items-list',
  templateUrl: './manage-items-list.component.html',
  styleUrls: ['./manage-items-list.component.css']
})
export class ManageItemsListComponent implements OnInit {
  @Input() itemsType; // -- 'feed', 'people' , 'products', 'companies' , 'responds', 'requests'
  @Input() userType: string; // - owner, responder


  @Input() typesEndPoint: string;
  @Input() types: CommonItem[];


  @Input() showFilter = true;
  @Input() showSearch = false;
  @Input() showSearchLabel = true;
  @Input() showOrdering = false;

  @Input() showCategories = false;


  @Input() showChildCategories = false;
  @Input() childCategoriesCarouselView = false;
  @Input() childCategoriesProductView = false;
  @Input() objectRelatedTypesFilter: string;

  @Input() appliedFilter = new UniversalFilter();


  @Output() newKeyword = new EventEmitter<string>();
  @Output() newOrdering = new EventEmitter<string>();

  @ViewChild('navigator') navigatorComponent: FilterNavigatorComponent;
  @ViewChild('likes') likesComponent: LikesDialogComponent;


  currentUserId: number;
  isBrowser = false;
  isMobile = false;
  locale = 'en';

  orderingCode = '-create_date';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(LOCAL_STORAGE) private localStorage: any,
              private deviceService: DeviceDetectorService, private generalService: GeneralService, public app: AppComponent,
              private translate: TranslateService) {


  }


  ngOnInit() {

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.currentUserId = +localStorage.getItem('user_id');
    this.locale = this.translate.currentLang;


    this.initOrdering();


    if (this.typesEndPoint) {
      this.getTypes();
    }
  }

  initOrdering() {
    if (this.itemsType === 'products' || this.itemsType === 'companies' || this.itemsType === 'communities' || this.itemsType === 'tags' || this.itemsType === 'favorite-tags') {
      this.orderingCode = 'popularity';
    }
  }

  getTypes() {

    this.generalService.getCommonItems(this.typesEndPoint)
      .then(res => {


        this.types = res;


      })
      .catch(error => {
        console.log(error);
      });
  }


  applyFilter(filter: UniversalFilter) {

    this.navigatorComponent.applyFilter(filter);
  }

  onShowLikes(params: any) {
    if (this.likesComponent) {
      this.likesComponent.onShowDialog(params);
    }


  }

  setKeyword(keyword: string) {
    this.newKeyword.emit(keyword);
  }


  changeOrdering(code: string) {
    this.newOrdering.emit(code);
  }


}
