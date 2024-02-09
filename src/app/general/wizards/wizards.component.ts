import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import {SelectUserOrCompanyComponent} from '../../common/select-user-or-company/select-user-or-company.component';
import {CreatePostComponent} from '../../post/create-post/create-post.component';
import {ProductWizardComponent} from './product-wizard/product-wizard.component';
import {CommonItem} from '../common-item';
import {Product} from '../../product/product';
import {NewArticle} from '../../post/article/article';
import {GeneralService} from '../general.service';

@Component({
  selector: 'app-wizards',
  templateUrl: './wizards.component.html',
  styleUrls: ['./wizards.component.css']
})
export class WizardsComponent implements OnInit {
  @ViewChild('chat') chatComponent: any;
  @ViewChild('createPostDialog') createPostDialogComponent: CreatePostComponent;
  @ViewChild('createProduct') createProductDialogComponent: ProductWizardComponent;
  @ViewChild('selectRole') selectRoleComponent: SelectUserOrCompanyComponent;

  isMobile = false;


  constructor(public appService: AppService, public deviceService: DeviceDetectorService, private router: Router,
              private service: GeneralService) {
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  onHideChat() {
    this.appService.currentChatId = 0;
    this.appService.selectedChat = null;
    this.appService.showChat = false;
  }


  @Input() set chatID(id: number) {
    this.chatComponent.nativeElement.chatID = id;
  }

  @Input() set currentChat(chat) {

    this.chatComponent.nativeElement.currentChat = chat;
  }



  onPostCreated(event) {
    this.appService.publishButtonDisabled = false;
    this.appService.newTimestamp();

  }

  onPostNotPublished() {
    this.appService.publishButtonDisabled = false;
  }

  onDialogPostCreated() {
    this.appService.showCreatePostDialog = false;
  }

  publishPost() {
    this.appService.publishButtonDisabled = true;
    this.createPostDialogComponent.publishPost();
  }

  onPostCancel() {
    this.appService.showCreatePostDialog = false;
  }

  @Input() set newPostDialog(newPost: any) {
    this.showPostDialog(newPost.postType, newPost.company);
  }

  showPostDialog(postType: CommonItem, company: number) {
    this.appService.postTypeName = postType.name;
    this.createPostDialogComponent.createNewPost(postType, company);
    this.appService.showCreatePostDialog = true;
  }


  @Input() set newCompany(create: boolean) {

    this.onCreateCompany();
  }

  onCreateCompany() {

      this.appService.showCompanyDialog = true;

  }

  @Input() set newProduct(company: number) {

    this.onCreateProduct(company);
  }


  onCreateProduct(company = null) {


    if (this.appService.isAuthenticated()) {
      if (!company) {

        if (this.appService.userProfile.has_companies) {
          this.appService.productCreating = true;
          this.appService.showRoleDialog = true;
        } else {
          this.setSelectedCompany(null);
          this.appService.showProductDialog = true;
        }
      } else {
        this.setSelectedCompany(company);


        this.appService.showProductDialog = true;
      }
    } else {
      this.appService.showAuthDialog = true;
    }
  }


  onProductCreated(product: Product) {

    this.appService.showProductDialog = false;
    this.router.navigate(['/product-admin/' + product.id]);

  }

  setSelectedCompany(company: number) {
    this.appService.selectedCompany = company;
    if (this.createProductDialogComponent) {
      this.createProductDialogComponent.company = company;
    }
  }

  onRoleSelected(event) {
    this.appService.showRoleDialog = false;
    if (this.appService.postCreating) {

      const type = this.getPostType(this.appService.currentPostCode);
      if (event.user) {

        this.showPostDialog(type, null);
      } else {
        this.showPostDialog(type, event.id);

      }
    }

    if (this.appService.productCreating) {


      if (event.user) {
        this.setSelectedCompany(null);

      } else {
        this.setSelectedCompany(event.id);

      }


      this.appService.showProductDialog = true;
    }

    if (this.appService.articleCreating) {

      if (event.user) {
        this.createArticle(null);

      } else {
        this.createArticle(event.id);

      }
    }

    this.appService.postCreating = false;
    this.appService.productCreating = false;
    this.appService.articleCreating = false;


  }

  onCancelCompanyDialog() {
    this.appService.showCompanyDialog = false;
  }

  getPostType(typeCode: string): CommonItem {

    if (this.appService.postTypes) {
      for (const type of this.appService.postTypes) {
        if (type.code === typeCode) {
          return type;

        }

      }
    }
  }

  onCompanyCreated(event) {
    this.appService.newTimestamp();
    this.appService.userProfile.has_companies = true;
    this.appService.showCompanyDialog = false;
    this.refreshUserRoles();

    this.router.navigate(['/company-admin/' + event.slug]);
  }

  @Input() set newRoles(refresh: boolean) {
    this.refreshUserRoles();
  }

  refreshUserRoles() {
    if (this.selectRoleComponent) {
      this.selectRoleComponent.setUserProfile(this.appService.userProfile);
    }
  }

  @Input() set newPost(type: string) {

    this.createPost(type);
  }

  createPost(code: string) {
    if (this.appService.isAuthenticated()) {
      this.appService.currentPostCode = code;


      if (this.appService.userProfile.has_companies) {
        this.appService.postCreating = true;
        this.appService.showRoleDialog = true;
      } else {
        const type = this.getPostType(code);
        this.showPostDialog(type, null);
      }
    } else {
      this.appService.showAuthDialog = true;
    }
  }

  @Input() set newArticle(create: boolean) {

    this.onCreateArticle();
  }

  onCreateArticle() {
    if (this.appService.isAuthenticated()) {


      if (this.appService.userProfile.has_companies) {
        this.appService.articleCreating = true;
        this.appService.showRoleDialog = true;
      } else {
        this.createArticle(null);
      }
    } else {
      this.appService.showAuthDialog = true;
    }
  }

  createArticle(company: number) {


    const newArticle = new NewArticle();

    if (company) {
      newArticle.company = company;
    }

    newArticle.user = this.appService.userProfile.user_id;
    newArticle.default_lang = this.appService.userProfile.interface_lang;
    newArticle.country = this.appService.userProfile.country;
    newArticle.city = this.appService.userProfile.city;

    this.service.createArticle(newArticle)
      .then(article => {

        this.appService.newTimestamp();

        this.router.navigate(['/edit-article/' + article.post]);

      })
      .catch(error => {
        console.log(error);
      });

  }


}
