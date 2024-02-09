import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Post, PostPreview} from '../post';
import {ConfirmationService} from 'primeng/api';

import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ActivatedRoute, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';

import {PostRespondsListComponent} from '../respond/post-responds-view/post-responds-list/post-responds-list.component';
import {StandardMessageService} from '../../standard-message.service';
import {TranslateService} from '@ngx-translate/core';
import {ProcessDialogComponent} from '../../common/process-dialog/process-dialog.component';
import {AppComponent} from '../../app.component';
import {MetaService} from '../../meta.service';
import {CopyLinkComponent} from '../../common/copy-link/copy-link.component';
import {AppConfig} from '../../config/config.service';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
  providers: [ConfirmationService]
})
export class PostViewComponent implements OnInit {

  siteUrl = AppConfig.settings.redirectUri;

  language = 'en';
  post: PostPreview;
  currentUserId = 0;
  loading = true;
  isBrowser = false;
  postId: number;
  isMobile = false;
  truncateNumber = 70;

  urlLanguage: string;
  rootPath = 'post';
  slug: string;
  subject: string;
  sslug: string;
  filterType: string;
  deleteConfirmationLabel: string;
  deleteMessageLabel: string;


  @ViewChild('list') listComponent: PostRespondsListComponent;
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  @ViewChild('copyLink') copyLinkComponent: CopyLinkComponent;



  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,

              private service: GeneralService,
              private activateRoute: ActivatedRoute, public app: AppComponent,
              private messageService: StandardMessageService, private translate: TranslateService,
              private metaService: MetaService,
              private deviceService: DeviceDetectorService, private confirmationService: ConfirmationService, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.postId = activateRoute.snapshot.params['id'];
    this.subject = activateRoute.snapshot.params['subject'];
    this.sslug = activateRoute.snapshot.params['sslug'];
    this.slug = activateRoute.snapshot.params['slug'];
    this.isMobile = this.deviceService.isMobile();
    const language = activateRoute.snapshot.params['language'];

    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      if (this.isBrowser) {
        this.app.appService.setLanguage();
        this.language = localStorage.getItem('language_code');
      } else {
        this.language = this.metaService.checkLanguage('en');
        this.language = 'en';
      }

    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }
  }

  ngOnInit() {


    if (this.isBrowser) {
      this.translate.get('GENERAL.Delete Confirmation').subscribe(res => {
        this.deleteConfirmationLabel = res;

      });

      this.translate.get('GENERAL.Please confirm your decision').subscribe(res => {
        this.deleteMessageLabel = res;

      });

      this.currentUserId = +localStorage.getItem('user_id');
      if (this.isMobile) {
        this.truncateNumber = 35;
      }



    }


    this.activateRoute.params.subscribe(routeParams => {
      this.postId = routeParams.id;
      this.subject = routeParams.subject;
      this.sslug = routeParams.sslug;
      this.slug = routeParams.slug;


      this.initData();


    });



  }

  onSearch(keyword: string) {
    if (this.listComponent) {
      this.listComponent.setKeyword(keyword);
    }
  }

  onCopyLink(link: string) {
    this.copyLinkComponent.openDialog(link);
  }


  onChangeNewQty() {


    if (this.post.type_details.code !== 'job') {
      this.post.eventsqty.new_responds = this.post.eventsqty.new_responds - 1;
    } else {
      this.post.eventsqty.new_applicants = this.post.eventsqty.new_applicants - 1;
    }


  }

  setMeta() {

    let title = this.post.seo_title;

    if (!title) {
      title =  this.post.post_title;

      if (this.post.country) {
        title = title + ' | ' + this.post.country_details.name;
      }

      if (this.post.city) {
        title = title + ', ' + this.post.city_details.name;
      }

      if (this.post.company) {
        if (this.post.company_details.name) {
          title = title + ' | ' + this.post.company_details.name;
        } else {
          title = title + ' | ' + this.post.company_default_details.name;
        }
      } else {
        if (this.post.user_data.user_profile.full_name) {
          title = title + ' | ' + this.post.user_data.user_profile.full_name;
        } else {
          title = title + ' | ' + this.post.user_data.user_profile_default.full_name;
        }
      }
    }


    const description = this.post.description;
    const slug = this.subject + '/' + this.sslug + '/' + this.slug;
    let url = null;

    if (this.post.images[0]) {
      url = this.post.images[0].file_details.medium_image_url;
    }
    this.metaService.addMetaTags(this.rootPath, slug,
      this.urlLanguage, title, description, url, true, 'article', null, false,
      null, false);
  }


  initData() {
    this.post = null;
    this.loading = true;

    if (this.slug) {
       const url = `${'get-post-by-slug/'}${this.subject}${'/'}${this.sslug}${'/'}${this.slug}`;
       this.service.getItem(url)
       .then(res => {
          this.postId = res.id;
          this.post = res;
          this.checkFilterType();

          this.setMeta();
          this.loading = false;

        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });



    } else {
      const url = `${'get-post/'}${this.postId}`;
      this.service.getItem(url)
      .then(res => {

          res.show_comments = true;

          this.post = res;

          this.checkFilterType();

          this.loading = false;


        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });

    }
  }


  checkFilterType() {
    if (this.post.type_details.code === 'job') {
      this.filterType = 'applicants';
    } else {
      this.filterType = 'responds';
    }
  }

  deletePost(): void {

    this.confirmationService.confirm({
      message: this.deleteMessageLabel,
      header: this.deleteConfirmationLabel,

      icon: 'fa fa-trash',
      accept: () => {

        this.processDialogComponent.show();
        const url = `${'delete-post/'}`;
        this.service.deleteItemByPk(url, this.post.id)
         .then(() => {
            this.processDialogComponent.close();

            this.messageService.addMessage({
              severity: 'success',
              summary: 'Post',
              detail: 'Successfully deleted'
            });

            this.router.navigate(['/feed/']);


          })
          .catch(error => {
            console.log(error);
          });

      },
      reject: () => {

        this.messageService.addMessage({severity: 'info', summary: 'Rejected', detail: ''}, false);
      }
    });

  }

  changeOrdering(orderCode: string) {
    if (this.listComponent) {
      this.listComponent.changeOrdering(orderCode);
    }
  }



}
