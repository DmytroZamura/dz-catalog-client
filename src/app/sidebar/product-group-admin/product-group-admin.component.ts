import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {Language} from '../../general/language';
import {ConfirmationService} from 'primeng/api';
import {ProductService} from '../../product/product.service';
import {GeneralService} from '../../general/general.service';
import {TreeNode} from 'primeng/api';
import {ProductGroup} from '../../product/product';
import {TranslateService} from '@ngx-translate/core';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-product-group-admin',
  templateUrl: './product-group-admin.component.html',
  styleUrls: ['./product-group-admin.component.css'],
  providers: [ConfirmationService]
})
export class ProductGroupAdminComponent implements OnInit {
  @Input() company_id: number;
  @Input() user_id: number;
  @Input() editable = false;

  @Output() msgPushed = new EventEmitter<any>();
  @Output() groupSelected = new EventEmitter<ProductGroup>();
  edit_mode = false;

  language: Language;
  lazyNodes: TreeNode[];
  selectedNode: TreeNode;
  newGroup: ProductGroup;
  root_group = true;
  displayDialog = false;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;

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


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private confirmationService: ConfirmationService,
              private productService: ProductService, private messageService: StandardMessageService,
              private generalService: GeneralService, private translate: TranslateService) {

  }

  ngOnInit() {

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });


    const lang_code = this.localStorage.getItem('language_code');

    this.generalService.getLanguageByCode(lang_code)
      .then(lang => {
          this.language = lang;
          this.initTree();
        }
      )
      .catch(error => {
        this.handleError(error);
      });

  }

  editGroups() {
    this.edit_mode = true;
  }

  cancelEditGroups() {
    this.edit_mode = false;
  }

  cancel() {
    this.displayDialog = false;
    this.newGroup = null;
  }

  addNewGroup() {
    this.newGroup = new ProductGroup();


    this.newGroup.company = this.company_id;
    this.newGroup.user = this.user_id;
    this.newGroup.language_code = 'en';

    if (this.selectedNode) {
      this.root_group = !(this.selectedNode.data.id !== null);


    } else {
      this.root_group = true;
    }
    this.displayDialog = true;
  }

  setChanged(node: TreeNode) {

    node.data.changed = true;

  }

  saveGroup(node: TreeNode) {

    const product_group = node.data;

    product_group.language_code = this.language.code;

    if (product_group.id) {


      this.productService.updateProductGroup(product_group, this.language.code)
        .then(res => {


          node.data = res;
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Product Group',
            detail: 'Successfully updated'
          });


        })
        .catch(error => {
          this.handleError(error);
        });
    }

  }


  saveNewGroup() {
    this.newGroup.company = this.company_id;
    this.newGroup.user = this.user_id;
    this.newGroup.language_code = 'en';
    if (!this.root_group && this.selectedNode) {
      this.newGroup.parent = this.selectedNode.data.id;
    }
    this.productService.createProductGroup(this.newGroup)
      .then(res => {

        this.displayDialog = false;
        // let node = [];
        if (!this.root_group && this.selectedNode) {
          if (this.selectedNode.expanded) {


            this.selectedNode.children.push({
              label: res.name,
              data: res,
              leaf: true
            });
          } else {

            this.selectedNode.children = [];

            this.selectedNode.expanded = true;
            this.generateTreeNode(this.selectedNode.data.id, this.selectedNode.children);
          }


        } else {
          this.lazyNodes.push({
            label: res.name,
            data: res,
            leaf: true
          });
        }

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Product Group',
          detail: 'Successfully created'
        });


      })
      .catch(error => {
        this.handleError(error);
      });
  }


  deleteGroup(node: TreeNode) {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {
        this.productService.deleteProductGroup(node.data.id)
          .then(res => {


            if (node.parent) {
              const index = node.parent.children.indexOf(node);
              node.parent.children.splice(index, 1);
            } else {

              const index = this.lazyNodes.indexOf(node);
              this.lazyNodes.splice(index, 1);
            }
            this.selectedNode = null;
            this.root_group = true;
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Product Group',
              detail: 'Successfully deleted'
            });


          })
          .catch(error => {
            this.handleError(error);
          });

      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });

  }

  nodeSelect(event) {

    this.groupSelected.emit(event.node.data);
  }

  nodeUnselect(event) {

    event.node.data.selected = false;
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

  onLanguageSelect(event) {
    this.language = event;
    this.selectedNode = null;
    this.initTree();
  }


  generateTreeNode(parent: number, node: TreeNode[]) {

    if (this.user_id) {
      this.productService.getUserChildProductGroups(this.user_id, parent, this.language.code)
        .then(objects => {


          ProductGroupAdminComponent.addTreeNodes(objects, node);


        })
        .catch(error => {
          this.handleError(error);
        });
    } else {
      if (this.company_id) {
        this.productService.getCompanyChildProductGroups(this.company_id, parent, this.language.code)
          .then(objects => {


            ProductGroupAdminComponent.addTreeNodes(objects, node);


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
