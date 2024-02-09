import {Input, Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';
import {Activity, AggregatedFeedItem, getPostLink, Post, PostEventsQty} from '../post';
import {Category} from '../../category/category';

import {UrlPreview} from '../../common/url-preview/url-preview';
import {ProductShort} from '../../product/product';
import {CompanyShort} from '../../company/company';
import {StandardMessageService} from '../../standard-message.service';
import {SignalService} from '../../signal.service';
import {CommentsListComponent} from '../comment/comments-list/comments-list.component';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Input() feedItem: AggregatedFeedItem;
  @Input() editable = false;
  @Input() currentUserId: number;
  @Input() index: number;
  @Input() isBrowser = true;
  @Input() locale = 'en';
  @Input() showActivitiesPanel = true;
  @Input() truncateNumber = 55;
  @Input() isMobile = false;
  @Input() asSharedPost = false;
  @Input() currencyCode = 'USD';
  @Input() showCommunity = true;
  @Input() truncateComment = true;
  @Input() siteUrl = 'https://www.uafine.com';


  @Output() postDeleted = new EventEmitter<any>();


  @Output() categorySelect = new EventEmitter<Category>();
  @Output() sendRespond = new EventEmitter<Post>();
  @Output() copyPostLink = new EventEmitter<string>();
  @Output() showLikes = new EventEmitter<any>();


  @ViewChild('list') listComponent: CommentsListComponent;


  edit_mode = false;
  ableToShare = true;
  urlPreview: UrlPreview;
  product: ProductShort;
  company: CompanyShort;
  previewSize = 'middle';
  showButtonRespond = true;
  showChildCreateCommentPanel = false;
  commentsActivity: Activity[];
  externalLink = true;
  postLink: string;
  slug: string;

  private newActivitiesSubscription: Subscription;


  constructor(private generalService: GeneralService,
              private signalService: SignalService, private router: Router,
              private messageService: StandardMessageService, public app: AppComponent) {
  }

  ngOnInit() {


    if (this.feedItem) {
      if (this.feedItem.verb === 'post' || this.feedItem.verb === 'filter') {
        this.post = this.feedItem.activities[0].object;
      } else {
        this.post = this.feedItem.activities[0].target;
      }

      if (this.feedItem.verb === 'comment' || this.feedItem.verb === 'comment_like') {
        this.initComments(this.feedItem.activities);
      }

    }

    if (this.post.type_details) {
      if (this.post.type_details.code === 'review' || (this.post.type_details.code === 'question' && (this.post.related_product
        || this.post.related_user || this.post.related_company))) {
        this.previewSize = 'small';
      }

      if (!this.post.eventsqty) {
        this.post.eventsqty = new PostEventsQty();
      }

      if (this.post.community) {
        this.ableToShare = this.post.community_details.open;
      }

      if (this.post.type_details.code === 'offering') {
        if (this.post.post_offering) {
          if (this.post.post_offering.type === 3) {
            this.showButtonRespond = false;
          }
        }
      }
      this.generatePostUrl();

      this.newActivitiesSubscription = this.signalService.newTimeLineActivity.subscribe(activity => {
        this.addPostActivity(activity);
      });

      this.checkProductAndCompany();
      this.checkUrlPreview();
      this.postImpression();
    }


  }

  ngOnDestroy() {

    if (this.newActivitiesSubscription) {
      this.newActivitiesSubscription.unsubscribe();
      this.newActivitiesSubscription = null;
    }
  }

  onCopyLink() {
    this.copyPostLink.emit(this.postLink);
  }

  generatePostUrl() {


    const link = getPostLink(this.post);

    this.slug = `${link}${'/'}${this.locale}`;
    this.postLink = `${this.siteUrl}${this.slug}`;
  }


  initComments(comments: Activity[]) {

    if ((this.feedItem.verb === 'comment' || this.feedItem.verb === 'comment_like')) {

      this.commentsActivity = [];

      for (const comment of comments) {

        if (comment.object) {
          if (this.commentsActivity.find((test) => test.object.id === comment.object.id) === undefined) {
            this.commentsActivity.push(comment);


          }
        }


      }

    }
  }

  addPostActivity(activity: AggregatedFeedItem) {

    if (activity.verb === 'like' || activity.verb === 'comment') {
      const postId = activity.activities[0].target.id;
      if (this.post) {

        if (this.post.id === postId) {
          if (activity.verb === 'like') {
            this.post.eventsqty.likes = this.post.eventsqty.likes + 1;
            this.app.newTimestamp();
          }

          if (activity.verb === 'comment') {
            this.post.eventsqty.comments = this.post.eventsqty.comments + 1;
            this.app.newTimestamp();
          }
        }

      }
    }

    if (activity.verb === 'comment_like') {
      if (this.post.id === activity.activities[0].target.post && this.commentsActivity) {
        for (const comment of this.commentsActivity) {
          if (comment.object.id === activity.activities[0].target.id) {
            comment.object.eventsqty.likes = comment.object.eventsqty.likes + 1;
            this.app.newTimestamp();
          }
        }
      }
    }

  }


  checkProductAndCompany() {
    if (this.post.company) {
      if (this.post.company_details.name) {
        this.company = this.post.company_details;
      } else {
        this.company = this.post.company_default_details;
      }
    }

    if (this.post.product) {
      if (this.post.product_details.name) {
        this.product = this.post.product_details;
      } else {
        this.product = this.post.product_default_details;
      }
    }


  }


  checkUrlPreview() {
    if (this.post.url || this.post.type_details.code === 'article') {

      const newUrlPreview = new UrlPreview();
      if (this.post.type_details.code === 'article') {

        if (this.post.article) {
          if (this.post.article.title) {

            this.post.title = this.post.article.title;
            this.post.description = this.post.article.description;
          } else {
            if (!this.post.published && this.post.article.title_draft) {
              this.post.title = this.post.article.title_draft;
            }
          }
        }


        this.externalLink = false;
        newUrlPreview.url = this.slug;
      } else {
        newUrlPreview.url = this.post.url;
      }

      newUrlPreview.is_video_url = this.post.is_video_url;
      newUrlPreview.image = this.post.image_url;
      newUrlPreview.title = this.post.title;
      newUrlPreview.site_name = this.post.site_name;
      newUrlPreview.description = this.post.description;
      this.urlPreview = newUrlPreview;


    } else {
      this.urlPreview = null;
    }
  }


  createComment() {

    if (this.app.appService.isAuthenticated()) {

      this.showChildCreateCommentPanel = !this.showChildCreateCommentPanel;
      this.post.show_comments = true;

      if (this.listComponent) {
        this.listComponent.openComments(true);
        this.listComponent.showCreateComment(this.showChildCreateCommentPanel);
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }

  }


  onCommentsClick() {
    if (this.app.appService.isAuthenticated()) {

      this.post.show_comments = true;
      if (this.listComponent) {
        this.listComponent.openComments(true);
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }


  }

  editPost(): void {

    if (this.post.type_details.code === 'article') {
      this.router.navigate(['/edit-article/' + this.post.id]);
    } else {
      this.edit_mode = true;
    }


  }

  onPostCancel() {

    const url = `${'get-post/'}${this.post.id}`;
    this.generalService.getItem(url)
      .then(new_post => {


        this.post = new_post;


        this.edit_mode = false;


      })
      .catch(error => {
        this.handleError(error);
      });


  }

  onPostPublished(event) {

    let post: Post;
    post = event;


    post.published = true;

    if (!post.post_request_positions) {
      post.post_request_positions = [];
    }
    if (!post.images) {
      post.images = [];
    }
    if (!post.documents) {
      post.documents = [];
    }


    const url = `${'post/'}${post.id}`;
    this.generalService.updateItem(url, post)
      .then(new_post => {

        this.app.newTimestamp();
        this.post = new_post;

        this.checkUrlPreview();
        this.edit_mode = false;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Post',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }


  deletePost(): void {
    let feed = false;
    if (this.feedItem) {
      feed = true;
    }
    this.postDeleted.emit({feed: feed, index: this.index, post: this.post});

  }

  changeStatus(published: boolean) {
    const url = `${'change-post-status/'}${this.post.id}${'/'}${published}`;
    this.generalService.updateItem(url, null)
      .then(res => {

        this.app.newTimestamp();
        this.post.published = published;

        if (published) {

          this.messageService.addMessage({
            severity: 'success',
            summary: 'Post',
            detail: 'Successfully published'
          });

        } else {

          this.messageService.addMessage({
            severity: 'success',
            summary: 'Post',
            detail: 'Changed to unpublished'
          });


        }

      })
      .catch(error => {
        this.handleError(error);
      });


  }

  onSelectCategory(category: Category) {

    this.categorySelect.emit(category);


  }

  sharePost(comment: string) {

    this.postEngagement(8);

    const post = new Post();
    post.published = true;
    post.user = this.currentUserId;
    post.type = this.post.type;
    post.comment = comment;
    if (!this.post.shared_post) {
      post.shared_post = this.post.id;
    } else {
      post.shared_post = this.post.shared_post;
    }

    const url = `${'create-post'}`;
    this.generalService.createItem(url, post)
      .then(res => {
        this.app.newTimestamp();
        this.post.eventsqty.shares = this.post.eventsqty.shares + 1;
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Post',
          detail: 'Successfully created'
        });


      })
      .catch(error => {
        this.handleError(error);
      });


  }



  onLikeChanged(status: boolean) {
    if (status) {
      this.post.eventsqty.likes = this.post.eventsqty.likes + 1;
    } else {
      this.post.eventsqty.likes = this.post.eventsqty.likes - 1;
    }
  }


  onUpdatePostCommentQty(qty: number) {
    this.postEngagement(8);
    this.post.eventsqty.comments = this.post.eventsqty.comments + qty;

  }


  onSendRespond() {

    if (this.app.appService.isAuthenticated()) {

      this.sendRespond.emit(this.post);
      this.postEngagement(2);
    } else {
      this.app.appService.showAuthDialog = true;
    }
  }


  postImpression() {
    if (this.post) {
      if (!this.post.admin_status) {
        const impression = {post: this.post.id, view: !this.truncateComment, impression: true, timestamp: this.app.appService.timestamp};

        this.generalService.createItem('create-post-impression', impression)
          .then()
          .catch(error => {
            console.log(error);
          });
      }
    }
  }


  postEngagement(type: number) {

    if (this.post) {
      const engagement = {post: this.post.id, type: type, timestamp: this.app.appService.timestamp};

      this.generalService.createItem('create-post-engagement', engagement)
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

  onShowLikes(params: any) {
    this.showLikes.emit(params);
  }

  onPromoteTop() {
     this.router.navigate(['/promotion/post-promotion/' + this.post.id]);
}

onImportanceRaising() {
    this.router.navigate(['/promotion/post-grade/' + this.post.id]);
}

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
