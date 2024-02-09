import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {TreeNode} from 'primeng/api';
import {Category} from '../../category/category';
import {TranslateService} from '@ngx-translate/core';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-user-categories-info',
  templateUrl: './user-categories-info.component.html',
  styleUrls: ['./user-categories-info.component.css']
})
export class UserCategoriesInfoComponent implements OnInit {
  @Input() profile: number;
  @Input() interest: boolean;
  @Input() disabled = false;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() categorySelected = new EventEmitter<Category>();
  lazyCategories: TreeNode[];
  selectedCategory: TreeNode;


  constructor( private service: GeneralService,
              private translate: TranslateService, private messageService: StandardMessageService) {


  }

  ngOnInit() {

    this.lazyCategories = [];
    const all_categories = new Category();
    all_categories.id = null;
    this.translate.get('CATEGORY.All Categories').subscribe(res => {
      this.lazyCategories.push({
        label: res,
        data: all_categories,
        leaf: true
      });


    });


    this.generateTreeNode(0, this.lazyCategories);

  }

  generateTreeNode(parent: number, node: TreeNode[]) {


    let interest_str = 'True';

    if (!this.interest) {
      interest_str = 'False';
    }

    const url = `${'get-child-profile-categories/'}${this.profile}${'/'}${parent}${'/'}${interest_str}`;
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


        for (const category of categories) {

          let leaf = true;
          if (category.child_qty > 0) {
            leaf = false;
          }
          node.push({
            label: category.category_details.name,
            data: category.category_details,
            // expandedIcon: 'ui-icon-folder-open',
            // collapsedIcon: 'ui-icon-folder',
            leaf: leaf
          });


        }


      })
      .catch(error => {
        this.handleError(error);
      });


  }


  nodeExpand(event) {
    if (event.node) {


      event.node.children = [];
      this.generateTreeNode(event.node.data.id, event.node.children);


    }
  }

  categorySelect(event) {
    if (!this.disabled) {
      this.categorySelected.emit(event.node.data);
    }
  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
