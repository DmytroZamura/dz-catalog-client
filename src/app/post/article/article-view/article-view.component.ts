import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Article} from '../article';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {ActivatedRoute, Router} from '@angular/router';

import {MetaService} from '../../../meta.service';
import {AppComponent} from '../../../app.component';
import {isPlatformBrowser} from '@angular/common';
import {StandardMessageService} from '../../../standard-message.service';
import {CommentsListComponent} from '../../comment/comments-list/comments-list.component';
import {Category} from '../../../category/category';
import {AppFilterService} from '../../../app-filter.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {GeneralService} from '../../../general/general.service';
import {AppConfig} from '../../../config/config.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  siteUrl = AppConfig.settings.redirectUri;
  @ViewChild('list') listComponent: CommentsListComponent;
  article: Article;
  language = 'en';
  urlLanguage: string;
  rootPath = 'article';
  isBrowser = false;
  slug: string;
  subject: string;
  sslug: string;
  currentUserId = 0;
  truncateNumber = 55;
  isMobile = false;
  showChildCreateCommentPanel = true;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(PLATFORM_ID) private platformId: any,
              private deviceService: DeviceDetectorService, private generalService: GeneralService,
              private activateRoute: ActivatedRoute, private metaService: MetaService,
              public app: AppComponent, private messageService: StandardMessageService, private router: Router,
              private filterService: AppFilterService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.deviceService.isMobile();
    this.subject = activateRoute.snapshot.params['subject'];
    this.sslug = activateRoute.snapshot.params['sslug'];
    this.slug = activateRoute.snapshot.params['slug'];

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
      this.currentUserId = +localStorage.getItem('user_id');
      if (this.isMobile) {
        this.truncateNumber = 28;
      }
    }

    this.activateRoute.params.subscribe(routeParams => {
      this.subject = routeParams.subject;
      this.sslug = routeParams.sslug;
      this.slug = routeParams.slug;

      this.initData();


    });


    // console.log('init');
    // this.initData();

  }

  setMeta() {
    let title = this.article.seo_title;
    if (this.article.post_details.company) {
      if (this.article.post_details.company_details.name) {
        title = title + ' | ' + this.article.post_details.company_details.name;
      } else {
        title = title + ' | ' + this.article.post_details.company_default_details.name;
      }
    } else {
      if (this.article.post_details.user_data.user_profile.full_name) {
        title = title + ' | ' + this.article.post_details.user_data.user_profile.full_name;
      } else {
        title = title + ' | ' + this.article.post_details.user_data.user_profile_default.full_name;
      }
    }

    const description = this.article.description;
    const slug = this.subject + '/' + this.sslug + '/' + this.slug;
    let url = null;

    if (this.article.image) {
      url = this.article.image_details.medium_image_url;
    }
    this.metaService.addMetaTags(this.rootPath, slug,
      this.urlLanguage, title, description, url, true, 'article', null, false,
      this.article.languages, false, this.article.link_canonical);
  }

  initData(): void {

    this.article = null;
    const url = `${'get-article-by-slug/'}${this.subject}${'/'}${this.sslug}${'/'}${this.slug}`;
    this.generalService.getItem(url)
      .then(res => {
        this.article = res;
        this.setMeta();
        this.postImpression();

      })
      .catch(error => {
        this.handleError(error);
      });


  }


  onLikeChanged(status: boolean) {
    if (status) {
      this.article.post_details.eventsqty.likes = this.article.post_details.eventsqty.likes + 1;
    } else {
      this.article.post_details.eventsqty.likes = this.article.post_details.eventsqty.likes - 1;
    }
  }

  createComment() {

    if (this.app.appService.isAuthenticated()) {

      this.showChildCreateCommentPanel = !this.showChildCreateCommentPanel;
      this.article.post_details.show_comments = true;
      if (this.listComponent) {
        this.listComponent.showCreateComment(this.showChildCreateCommentPanel);
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }

  }


  onCommentsClick() {
    if (this.app.appService.isAuthenticated()) {

      this.article.post_details.show_comments = true;
    } else {
      this.app.appService.showAuthDialog = true;
    }


  }

  editPost(): void {
    this.router.navigate(['/edit-article/' + this.article.post]);


  }

  onUpdatePostCommentQty(qty: number) {
    this.postEngagement(8);
    this.article.post_details.eventsqty.comments = this.article.post_details.eventsqty.comments + qty;

  }

  onSelectCategory(category: Category) {


    this.filterService.changeCategory(category, 'feed/' + this.language);


  }


  postImpression() {
    if (this.article.post_details) {
      const impression = {post: this.article.post_details.id, view: true, impression: true, timestamp: this.app.appService.timestamp};

      this.generalService.createItem('create-post-impression', impression)
        .then()
        .catch(error => {
          console.log(error);
        });

    }
  }

  onFavoriteButtonClicked(status: boolean) {
    if (status) {
      this.postEngagement(4);
    }
  }

  postEngagement(type: number) {
    if (this.article.post_details) {
      const engagement = {post: this.article.post_details.id, type: type, timestamp: this.app.appService.timestamp};

      this.generalService.createItem('create-post-engagement', engagement)
        .then()
        .catch(error => {
          console.log(error);
        });

    }
  }

  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }


}
