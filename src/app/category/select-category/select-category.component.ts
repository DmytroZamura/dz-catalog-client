import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryService} from '../category.service';
import {Category, SuggestedCategory} from '../category';
import {AutoComplete} from 'primeng/autocomplete';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {

  filteredCategories: Category[];
  categories: Category[];
  @Input() object: any;
  @Input() mode: string;
  @Input() label = true;
  @Input() label_text: string;
  @Input() disabled = false;
  @Input() category: Category;
  @Input() required = false;
  @Input() filter = '?';
  @Input() suggestedCategory: SuggestedCategory;
  @Input() showSuggestCategory = false;
  @Output() categorySelect = new EventEmitter<Category>();
  @Output() categorySuggested = new EventEmitter<SuggestedCategory>();
  @ViewChild('selectCategory') categoryComponent: AutoComplete;
  @ViewChild('selectCategory2') category2Component: AutoComplete;

  categoryNotExists = false;
  enteredName: string;


  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {

    if (this.suggestedCategory) {
      this.setSuggested(this.suggestedCategory);
    }


  }

  checkCategoryName(): boolean {


    if (this.enteredName) {
      if (this.suggestedCategory) {
        if (this.suggestedCategory.name !== this.enteredName) {
          this.categoryNotExists = true;
          return false;
        }
      } else {

        if (this.category) {
          if (this.category.name !== this.enteredName) {
            this.categoryNotExists = true;
            return false;
          }
        } else {
          this.categoryNotExists = true;
          return false;
        }
      }

    }

    return true;
  }


  getFilteredCategories(event): void {

    this.suggestedCategory = null;
    if (event.query) {
      this.enteredName = event.query;
      if (!this.mode) {

        this.categoryService.getFilteredCategories(event.query, this.filter)
          .then(categories => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
            categories.sort(function (category1, category2) {
              if (category1.name_with_parent < category2.name_with_parent) {
                return -1;
              } else if (category1.name_with_parent > category2.name_with_parent) {
                return 1;
              } else {
                return 0;
              }
            });

            this.filteredCategories = categories;


          })
          .catch(error => {
            console.log(error);
          });

      } else {

        if (this.mode === 'Profile') {

          const profile = this.object.profile;
          let interest = 'False';

          if (this.object.interest === true) {
            interest = 'True';
          }


          this.categoryService.getFilteredCategoriesFroProfile(event.query, profile, interest)
            .then(categories => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
              categories.sort(function (category1, category2) {
                if (category1.name_with_parent < category2.name_with_parent) {
                  return -1;
                } else if (category1.name_with_parent > category2.name_with_parent) {
                  return 1;
                } else {
                  return 0;
                }
              });

              this.filteredCategories = categories;


            })
            .catch(error => {
              console.log(error);
            });
        }

      }
    }
  }


  onCategorySelect(event) {
    this.categoryNotExists = false;
    this.enteredName = null;
    this.suggestedCategory = null;
    this.category = event;
    this.categorySelect.emit(event);



  }


  stopSpinner() {
    if (this.categoryComponent) {
      this.categoryComponent.loading = false;
    }

    if (this.category2Component) {
      this.category2Component.loading = false;
    }
  }

  onClear() {
    this.categoryNotExists = false;
    this.enteredName = null;
    const category = new Category();
    this.category = category;
    this.suggestedCategory = null;
    this.categorySelect.emit(category);

  }

  setSuggested(category: SuggestedCategory) {
    this.categoryNotExists = false;
    this.enteredName = null;
    this.suggestedCategory = category;
    this.category = new Category();
    this.category.name = category.name;
  }

  onCategorySuggested(category: SuggestedCategory) {
    this.setSuggested(category);
    this.categorySuggested.emit(category);
  }


}
