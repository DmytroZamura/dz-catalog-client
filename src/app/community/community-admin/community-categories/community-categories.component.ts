import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {CommunityCategory} from '../../community';
import {Category} from '../../../category/category';
import {StandardMessageService} from '../../../standard-message.service';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-community-categories',
  templateUrl: './community-categories.component.html',
  styleUrls: ['./community-categories.component.css']
})
export class CommunityCategoriesComponent implements OnInit {
  @Input() community: number;
  @Input() edit_mode = false;
  @Output() msgPushed = new EventEmitter<any>();
  categories: Category[];


  constructor(private service: GeneralService,
              private messageService: StandardMessageService) {
  }


  ngOnInit() {

    this.getCategories();
  }


  getCategories(): void {
      const url = `${'get-community-categories-view/'}${this.community}`;
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


    const new_category = new CommunityCategory();

    new_category.community = this.community;
    new_category.category = event.id;

    new_category.community_category = true;

const url = `${'create-community-category'}`;
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

     const url = `${'delete-community-category/'}${this.community}${'/'}${category.id}${'/'}`;
     this.service.deleteItemByPk(url, null)
     .then(() => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Category',
          detail: 'Successfully deleted'
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
