import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserProfileCategory} from '../profile';
import {Category} from '../../category/category';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-profile-categories',
  templateUrl: './profile-categories.component.html',
  styleUrls: ['./profile-categories.component.css']
})
export class ProfileCategoriesComponent implements OnInit {
  @Input() profile: number;
  @Input() interest: boolean;
  @Input() disabled = false;
  @Output() msgPushed = new EventEmitter<any>();
  categories: Category[];


  constructor(private service: GeneralService,
              private messageService: StandardMessageService) {
  }


  ngOnInit() {

    this.getCategories();
  }


  getCategories(): void {
    let interest_str = 'True';

    if (!this.interest) {
      interest_str = 'False';
    }

    const url = `${'get-profile-categories/'}${this.profile}${'/'}${interest_str}`;
    this.service.getItems(url)
      .then(categories => {


        categories.sort(function (category1, category2) {
          if (category1.category_details.name_with_parent < category2.category_details.name_with_parent) {
            return -1;
          } else if (category1.category_details.name_with_parent > category2.category_details.name_with_parent) {
            return 1;
          } else {
            return 0;
          }
        });

        this.categories = [];
        for (const object of categories) {

          this.categories.push(object.category_details);


        }


      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onCategorySelect(event): void {


    const new_category = new UserProfileCategory();

    new_category.profile = this.profile;
    new_category.category = event.id;
    new_category.interest = this.interest;
    new_category.profile_category = true;

    const url = `${'create-profile-category'}`;
    this.service.createItem(url, new_category)
      .then(category => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Category',
          detail: 'Successfully added'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  deleteCategory(category: Category): void {

     const url = `${'delete-profile-category/'}${this.profile}${'/'}${category.id}${'/'}`;

     this.service.deleteItemByPk(url, null)
     .then(() => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Category',
          detail: 'Successfully removed'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }


}
