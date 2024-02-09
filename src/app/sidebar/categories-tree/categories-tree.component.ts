import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

import {Category} from '../../category/category';
import {CategoryService} from '../../category/category.service';
import {BrowserService} from '../../browser.service';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.css']
})
export class CategoriesTreeComponent implements OnInit {
  @Input() parent = 0;
  @Input() filter = '?';
  @Input() disabled = false;
  @Output() categorySelected = new EventEmitter<Category>();
  @Output() msgPushed = new EventEmitter<any>();
  lazyCategories: TreeNode[];
  selectedCategory: TreeNode;
  isBrowser = false;
  init = true;


  constructor(private categoryService: CategoryService, private translate: TranslateService,
              private messageService: StandardMessageService,
              private browserService: BrowserService) {
    this.isBrowser = this.browserService.isBrowser;
  }


  ngOnInit() {


    this.refreshCategories(this.parent, this.filter);

  }


  refreshCategories(parent: number, contentFilterType, init = false) {

    if (init) {
      this.init = true;
    }

    if (!parent) {
      parent = 0;
    }


    if (this.parent !== parent || this.init || this.filter !== contentFilterType) {
      this.filter = contentFilterType;
      this.parent = parent;
      if (this.init) {
        this.init = false;
      }
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


      this.generateTreeNode(parent, this.lazyCategories);
    }

  }

  generateTreeNode(parent: number, node: TreeNode[]) {

    this.categoryService.getCategoryChilds(parent, this.filter)
      .then(categories => {


        categories.sort(function (category1, category2) {
          if (category1.name_with_parent < category2.name_with_parent) {
            return -1;
          } else if (category1.name_with_parent > category2.name_with_parent) {
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
            label: category.name,
            data: category,
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
      this.refreshCategories(event.node.data.id, this.filter);
    }

  }


  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
