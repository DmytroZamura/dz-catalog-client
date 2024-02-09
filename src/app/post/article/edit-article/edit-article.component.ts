import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../../../app.component';

import {Article} from '../article';
import {StandardMessageService} from '../../../standard-message.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Category} from '../../../category/category';
import {GLocation} from '../../../general/city';
import {UserImage} from '../../../common/file/file';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';

import {GeneralService} from '../../../general/general.service';
import {UtilsService} from '../../../utils.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  providers: [ConfirmationService]
})
export class EditArticleComponent implements OnInit {
  toolbarArticle: any[] = [
    [{'header': [2, 3, 4, false]}],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{'align': []}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'color': []}, {'background': []}],
    ['blockquote', 'code-block'],


    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

    // [{ 'font': [] }],

    ['clean'],                                         // remove formatting button
    ['link'],
    ['video']
  ];

  id: number;
  article: Article;
  isBrowser = false;
  languageCode = 'en';
  truncateNumber = 55;
  isMobile = false;
  readyToSave = false;
  processing = false;
  activeIndex = 0;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;
  showAdvanced = false;

  @ViewChild('deleteDialog') deleteDialogComponent: ProcessDialogComponent;


  constructor(@Inject(PLATFORM_ID) private platformId: any, private deviceService: DeviceDetectorService,
              private activateRoute: ActivatedRoute, public app: AppComponent, private service: GeneralService, private router: Router,
              private messageService: StandardMessageService, @Inject(LOCAL_STORAGE) private localStorage: any,
              private translate: TranslateService,
              private confirmationService: ConfirmationService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.app.appService.setLanguage();

  }

  ngOnInit() {

    this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
      this.deleteConfirmationLabel = res;

    });

    this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
      this.deleteMessageLabel = res;

    });

    if (this.isMobile) {
      this.truncateNumber = 23;
    }

    if (this.isBrowser) {

      this.languageCode = localStorage.getItem('language_code');
      this.id = +this.activateRoute.snapshot.params['id'];
      if (this.id) {
        this.getArticleInLanguage(this.languageCode);
      }


    }

    this.activateRoute.params.subscribe(routeParams => {
      if (this.id !== +routeParams.id) {
        this.id = +routeParams.id;
        this.getArticleInLanguage(this.languageCode);


      }
    });


  }


  onLanguageChanged(event) {
    this.activeIndex = event.index;
    this.showAdvanced = false;
    if (this.article.languages[event.index]) {
      this.getArticleInLanguage(this.article.languages[event.index].code);
    }

  }

  onCloseTab(event) {
    if (this.article.languages[event.index]) {
      this.deleteArticleLanguage(this.article.languages[event.index].code);
    }
  }


  showAdvancedSettings() {
    this.showAdvanced = true;
  }

  getArticleInLanguage(lang: string) {
    this.processing = true;
    const url = `${'update-article-in-language/'}${this.id}${'/'}${lang}`;
    this.service.getItem(url)
      .then(res => {
        this.languageCode = res.language_code;
        // this.activeIndex = 0;

        this.article = res;
        this.processing = false;
      })
      .catch(error => {
        this.handleError(error);
      });

  }


  checkCompanyDetails() {
    if (this.article) {
      if (this.article.post_details.company) {
        if (!this.article.post_details.company_details.name) {
          this.article.post_details.company_details = this.article.post_details.company_default_details;
        }
      }
    }
  }

  setReadyToSave() {
    this.readyToSave = true;
  }

  saveArticle() {
    this.processing = true;
    this.article.to_publish = true;

    this.article.text_draft = UtilsService.addNowFollow(this.article.text_draft);
    const url = `${'update-article-in-language/'}${this.article.post}${'/'}${this.languageCode}`;
    this.service.updateItem(url, this.article)
      .then(article => {

        this.app.newTimestamp();
        this.languageCode = article.language_code;
        this.article = article;
        this.readyToSave = false;
        this.processing = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Article',
          detail: 'Successfully updated'
        });

      })
      .catch(error => {
        this.handleError(error);
      });


  }


  addLanguage(event) {
    if (event.value) {
      this.article.title_draft = '';
      this.article.description_draft = '';
      this.article.text_draft = '';
      this.article.seo_title_draft = '';
      this.article.description_draft = '';
      this.article.language_code = event.value.code;
      this.processing = true;
      const url = `${'update-article-in-language/'}${this.article.post}${'/'}${event.value.code}`;
      this.service.updateItem(url, this.article)
        .then(article => {
          this.app.newTimestamp();
          this.activeIndex = 0;
          this.article = article;
          this.languageCode = article.language_code;

          this.readyToSave = false;
          this.processing = false;
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Article',
            detail: 'Successfully updated'
          });

        })
        .catch(error => {
          this.handleError(error);
        });


    }

  }

  deleteArticleLanguage(language: string) {
    const url = `${'delete-article-language/'}${this.article.post}${'/'}${language}${'/'}`;
    this.service.createItem(url, null)
      .then(article => {
        this.activeIndex = 0;
        this.languageCode = article.language_code;
        this.article = article;
        this.app.newTimestamp();
        this.readyToSave = false;
        this.processing = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Article',
          detail: 'Successfully updated'
        });

      })
      .catch(error => {
        this.handleError(error);
      });

  }

  publish() {
    this.processing = true;

    const url = `${'publish-article/'}${this.article.post}`;
    this.service.updateItem(url, this.article)
      .then(article => {

        this.app.newTimestamp();
        this.languageCode = article.language_code;
        this.article = article;
        this.readyToSave = false;
        this.processing = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Article',
          detail: 'Successfully published'
        });

      })
      .catch(error => {
        this.handleError(error);
      });

  }

  deleteArticle() {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteDialogComponent.show();
        const url = `${'delete-post/'}`;
        this.service.deleteItemByPk(url, this.id)
          .then(res => {
            this.app.newTimestamp();
            this.deleteDialogComponent.close();
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Article',
              detail: 'Successfully deleted'
            });

            if (this.article.post_details.company) {
              this.router.navigate(['company-admin/' + this.article.post_details.company_default_details.slug + '/1']);
            } else {

              this.router.navigate(['profile/1']);
            }


          })
          .catch(error => {
            this.deleteDialogComponent.close();
            this.handleError(error);
          });


      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });


    this.app.newTimestamp();
  }

  onCategorySelect(category: Category) {


    if (category.id) {

      this.article.draft_category = category.id;

    } else {
      this.article.draft_category = null;
    }
    this.article.draft_category_details = category;
    this.setReadyToSave();


  }


  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.article.draft_country = location.country.id;
      } else {
        this.article.draft_country = null;
      }
      this.article.draft_country_details = location.country;
      if (location.city) {
        this.article.draft_city = location.city.id;
      } else {
        this.article.draft_city = null;
      }
      this.article.draft_city_details = location.city;

      this.setReadyToSave();

    }

  }

  onImageUpload(image: UserImage) {

    if (image) {
      this.article.image_draft = image.id;
    } else {
      this.article.image_draft = null;
    }
    this.article.image_draft_details = image;
    this.setReadyToSave();
  }

  private handleError(error: any): void {

    this.messageService.addMessage({
      severity: 'error',
      summary: 'An error occurred',
      detail: error
    }, false);


  }


}
