import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../category.service';
import {Category, CategoryParentSet} from '../category';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-categories-navigator',
  templateUrl: './categories-navigator.component.html',
  styleUrls: ['./categories-navigator.component.css']
})
export class CategoriesNavigatorComponent implements OnInit {

  @Input() alwaysShowPanel = false;
  @Input() showChildCategories = false;
  @Input() filter = '?';
  @Input() currentCategoryId: number;
  @Input() carouselView = false;
  @Input() productView = false;
  @Input() disabled = false;
  @Input() styleClass = '';
  @Output() categorySelect = new EventEmitter<Category>();
  categoryParentSet: CategoryParentSet;
  items: MenuItem[];
  homeItem: MenuItem;
  childCategories: Category[];

  responsiveOptions;
  childCategoriesReadyToShow = false;
  categoriesReadyToShow = false;


  constructor(private categoryService: CategoryService) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {


    this.homeItem = {

      icon: 'pi pi-home',
      command: (event: any) => {
        const category = new Category();
        this.categoriesReadyToShow = false;
        this.onSelectCategory(category);


      }
    };


    // this.onCategoryChanged(null);
    if (this.currentCategoryId) {
      this.onCategoryChanged(this.currentCategoryId);
    }
    // this.getCategories();
  }


  onCategoryChanged(event) {
    this.items = [];
    // this.addAllCategories();

    if (event) {

      this.getCategories(event);

    } else {
       this.categoriesReadyToShow = false;
    }

    if (this.showChildCategories) {

      this.childCategoriesReadyToShow = false;
      this.getChildCategories(event);
    }

  }

  getCategories(category: number) {

    this.categoryService.getCategoryParents(category)
      .then(res => {


        this.categoryParentSet = res;


        this.generateCategories(res);
        this.categoriesReadyToShow = true;


      })
      .catch(error => {
        console.log(error);
      });


  }


  getChildCategories(category: number) {

    if (this.showChildCategories) {
      if (!category) {
        category = 0;
      }


      if (this.currentCategoryId !== category) {
        this.currentCategoryId = category;


        this.categoryService.getCategoryChilds(category, this.filter)
          .then(res => {
            if (res.length > 0) {


              this.childCategories = res;
              this.childCategoriesReadyToShow = true;
            } else {
              this.childCategories = null;
              this.childCategoriesReadyToShow = false;
            }


          })
          .catch(error => {
            console.log(error);
          });
      } else {
          this.childCategoriesReadyToShow = true;
      }

    }
  }


  generateCategories(category: CategoryParentSet) {

    if (category.parent_details) {

      this.generateCategories(category.parent_details);
    }


    const index = this.items.push({

      label: category.name,
      command: (event: any) => {
        this.onSelectCategory(category);

      }
    });


  }

  onSelectCategory(category: Category) {

    if (!this.disabled) {
      this.categorySelect.emit(category);
    }

  }




}
