import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {Category, SuggestedCategory} from '../category';
import {CategoryService} from '../category.service';
import {CategoriesNavigatorComponent} from '../categories-navigator/categories-navigator.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {SuggestCategoryDialogComponent} from './suggest-category-dialog/suggest-category-dialog.component';
import {isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-select-category-dialog',
  templateUrl: './select-category-dialog.component.html',
  styleUrls: ['./select-category-dialog.component.css']
})
export class SelectCategoryDialogComponent implements OnInit {
  @Input() filter = '?';

  @Input() showSuggestCategory = false;
  @Output() categorySelect = new EventEmitter<Category>();
  @Output() dialogHide = new EventEmitter<void>();
  @Output() categorySuggested = new EventEmitter<SuggestedCategory>();
  @ViewChild('navigator') navigatorComponent: CategoriesNavigatorComponent;
  @ViewChild('suggestion') suggestionComponent: SuggestCategoryDialogComponent;

  showDialog = false;
  categories: Category[];
  selectedCategory: Category;
  parent = 0;
  truncateNumber = 85;
  isMobile = false;
  loading = false;
  currentUseId = 0;
  isBrowser = false;


  constructor(private categoryService: CategoryService, @Inject(PLATFORM_ID) private platformId: Object,
              private deviceService: DeviceDetectorService, @Inject(LOCAL_STORAGE) private localStorage: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    if (this.isBrowser) {
      this.currentUseId = +this.localStorage.getItem('user_id');
    }
    // if (this.isMobile) {
    //   this.truncateNumber = 70;
    // }
  }

  onHide() {
    this.dialogHide.emit();
  }

  showCategoryDialog(category: Category) {
    this.categories = [];
    if (!category) {
      this.parent = 0;
      this.selectedCategory = null;
      this.navigatorComponent.onCategoryChanged(0);

    } else {
      this.selectedCategory = category;
      if (category.child_qty > 0) {

        this.parent = category.id;
        this.navigatorComponent.onCategoryChanged(this.parent);
      } else {
        this.parent = category.parent;
        this.navigatorComponent.onCategoryChanged(this.parent);
      }
    }

    this.getCategories(this.parent);

  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.showDialog = false;
    this.categorySelect.emit(this.selectedCategory);
  }

  showChildCategories(category: Category) {

    this.setCurrentCategory(category);
    this.navigatorComponent.onCategoryChanged(category.id);
  }

  setCurrentCategory(category: Category) {

    this.selectedCategory = category;

    if (category.child_qty === 0) {
      this.selectCategory(category);

    } else {
      this.getCategories(category.id);
    }
    // this.navigatorComponent.onCategoryChanged(category.id);
  }

  getCategories(parent: number) {
    this.categories = [];

    this.loading = true;
    if (!parent) {
      parent = 0;
    }

    this.categoryService.getCategoryChilds(parent, this.filter)
      .then(categories => {

        if (categories[0]) {
          categories.sort(function (category1, category2) {
            if (category1.name_with_parent < category2.name_with_parent) {
              return -1;
            } else if (category1.name_with_parent > category2.name_with_parent) {
              return 1;
            } else {
              return 0;
            }
          });
          this.loading = false;
          this.categories = categories;

          if (!this.showDialog) {
            this.showDialog = true;
          }
        } else {
          this.selectCategory(this.selectedCategory);
        }

      })
      .catch(error => {
        console.log(error);
      });

  }

  onCategorySuggested(category: SuggestedCategory) {
    this.showDialog = false;
    this.categorySuggested.emit(category);
  }

  onSuggestCategory() {

    let category = null;
    if (this.selectedCategory) {
      if (this.selectedCategory.id) {
        category = this.selectedCategory;
      }
    }
    if (this.suggestionComponent) {
      this.suggestionComponent.showSuggestionDialog(category);
    }
  }

}
