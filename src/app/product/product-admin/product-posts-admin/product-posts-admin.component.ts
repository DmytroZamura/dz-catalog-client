import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from '../../product';
import {Currency} from '../../../general/currency';
import {AppConfig} from '../../../config/config.service';
import {SendPostRespondComponent} from '../../../post/respond/send-post-respond/send-post-respond.component';
import {Post} from '../../../post/post';

@Component({
  selector: 'app-product-posts-admin',
  templateUrl: './product-posts-admin.component.html',
  styleUrls: ['./product-posts-admin.component.css']
})
export class ProductPostsAdminComponent implements OnInit {
  @Input() product: Product;
  @Input() currentCurrencyId: number;
  @Input() currentCurrencyDetails: Currency;
  @Input() isMobile = false;
  @Input() isBrowser = false;
  @Input() locale = 'en';
  @Input() currentUserId = 0;
  @Output() msgPushed = new EventEmitter<any>();
  @ViewChild('respond') sendRespondComponent: SendPostRespondComponent;
  siteUrl = AppConfig.settings.redirectUri;
  truncateNumber = 55;

  constructor() {
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (this.isMobile) {
        this.truncateNumber = 28;
      }


    }
  }

  onSendRespond(post: Post, index, feedType) {

    if (this.sendRespondComponent) {
      this.sendRespondComponent.showDialog(post, index, feedType);
    }
  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }

}
