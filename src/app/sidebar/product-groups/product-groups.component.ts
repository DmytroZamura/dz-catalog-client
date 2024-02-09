import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {ProductGroup} from '../../product/product';
import {TreeNode} from 'primeng/api';
import {ProductService} from '../../product/product.service';
import {TranslateService} from '@ngx-translate/core';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.css']
})
export class ProductGroupsComponent implements OnInit {
  @Input() company_id: number;
  @Input() user_id: number;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() groupSelected = new EventEmitter<ProductGroup>();
  lazyNodes: TreeNode[];
  selectedNode: TreeNode;
  lang_code = 'en';

  private static addTreeNodes(objects: ProductGroup[], node: TreeNode[]) {
    objects.sort(function (object1, object2) {
      if (object1.name < object2.name) {
        return -1;
      } else if (object1.name > object2.name) {
        return 1;
      } else {
        return 0;
      }
    });


    for (let object of objects) {

      let leaf = true;
      if (object.child_qty > 0) {
        leaf = false;
      }
      node.push({
        label: object.name,
        data: object,
        leaf: leaf
      });


    }
  }

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private productService: ProductService,
              private translate: TranslateService, private messageService: StandardMessageService) {
    this.lang_code = localStorage.getItem('language_code');
  }

  ngOnInit() {
    this.initTree();
  }


  nodeSelect(event) {

    this.groupSelected.emit(event.node.data);
  }

  initTree() {
    this.lazyNodes = [];
    const all_goups = new ProductGroup();
    all_goups.id = null;
    this.translate.get('PRODUCT.All Products').subscribe(res => {
      all_goups.name = res;
      this.lazyNodes.push({
        label: res,
        data: all_goups,
        leaf: true
      });


    });
    this.generateTreeNode(0, this.lazyNodes);
  }

  generateTreeNode(parent: number, node: TreeNode[]) {

    if (this.user_id) {
      this.productService.getUserChildProductGroups(this.user_id, parent, this.lang_code)
        .then(objects => {


          ProductGroupsComponent.addTreeNodes(objects, node);


        })
        .catch(error => {
          this.handleError(error);
        });
    } else {
      if (this.company_id) {
        this.productService.getCompanyChildProductGroups(this.company_id, parent, this.lang_code)
          .then(objects => {


            ProductGroupsComponent.addTreeNodes(objects, node);


          })
          .catch(error => {
            this.handleError(error);
          });
      }
    }
  }


  nodeExpand(event) {
    if (event.node) {


      event.node.children = [];
      this.generateTreeNode(event.node.data.id, event.node.children);


    }
  }


  private handleError(error: any): void {


    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
