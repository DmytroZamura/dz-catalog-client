import {Component, Input, OnInit} from '@angular/core';

import {cutPostUrl, getPostLink, Post, PostShort} from '../post';

import {GeneralService} from '../../general/general.service';

import {AppService} from '../../app.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {

  @Input() post: PostShort;
  @Input() isMobile = false;
  @Input() truncateNumber = 310;
  @Input() truncateWords = 100;
  @Input() siteUrl = 'https://www.uafine.com';
  @Input() language = 'en';
  @Input() readMore = false;
  @Input() showPromoteDate = false;
  postLink: string;
  comment: string;
  slug: string;
  price: number;
  priceFrom: number;
  oldPrice: number;
  oldPriceFrom: number;


  constructor(private generalService: GeneralService, private appService: AppService) {
  }

  ngOnInit() {

    if (this.post.url && this.post.comment) {

      this.comment = cutPostUrl(this.post.url, this.post.comment);
    } else {
      this.comment = this.post.comment;
    }

    this.checkArticleTitle();
    this.generatePostUrl();
    // this.postImpression();
  }

  initPrices() {
    if (this.post.type_details.code === 'offering') {
      if (this.post.post_offering.discount_price) {
        this.price = this.post.post_offering.discount_price;
        this.priceFrom = this.post.post_offering.discount_price_from;
        this.oldPrice = this.post.post_offering.price;
        this.oldPriceFrom = this.post.post_offering.price_from;
      } else {
        this.price = this.post.post_offering.price;
        this.priceFrom = this.post.post_offering.price_from;
      }
    }
  }

  checkArticleTitle() {


    if (this.post.article) {
      if (this.post.article.title) {

        this.post.title = this.post.article.title;
        this.post.description = this.post.article.description;
      }
    }


  }

  generatePostUrl() {


    const link = getPostLink(this.post as Post);

    this.slug = `${link}${'/'}${this.language}`;
    this.postLink = `${this.siteUrl}${this.slug}`;
  }

  postImpression() {
    if (this.post) {

      const impression = {post: this.post.id, view: false, impression: true, timestamp: this.appService.timestamp};

      this.generalService.createItem('create-post-impression', impression)
        .then()
        .catch(error => {
          console.log(error);
        });
    }

  }

  setPromoted(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days + 1);
    this.post.promotion_date = date.toLocaleDateString(this.language);
    this.post.promotion = true;
    this.showPromoteDate = true;
  }

  setImportance(qty: number) {
    this.post.promotion_grade = this.post.promotion_grade + qty;
  }

}
