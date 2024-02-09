import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProfileShort, UserWithProfile} from '../../profile/profile';
import {Router} from '@angular/router';
import {PreviewOverlayPanelComponent} from '../preview-overlay-panel/preview-overlay-panel.component';
import {getProductLink, ProductShort} from '../../product/product';

@Component({
  selector: 'app-user-preview-short',
  templateUrl: './user-preview-short.component.html',
  styleUrls: ['./user-preview-short.component.css']
})
export class UserPreviewShortComponent implements OnInit {
  @Input() userData: UserWithProfile;
  @Input() company: number;
  @Input() product: ProductShort;
  @Input() currentUser = 0;
  @Input() showJobPosition = false;
  @Input() showInfo = true;
  @Input() showLink = true;
  @Input() message: string;
  @Input() showSlug = false;
  @Input() currencyCode = 'USD';
  @Input() rating: number;
  @Input() locale = 'en';

  @Input() size = 'middle'; // small, middle // actor
  @Input() truncate_number = 20;
  @Input() showPreview = false;
  @Input() editRating = false;

  @Output() rated = new EventEmitter<number>();
  @Output() itemClicked = new EventEmitter<void>();
  @ViewChild('previewpanel') previewPanel: PreviewOverlayPanelComponent;
  profile: ProfileShort;

  constructor(private router: Router) {
  }

  ngOnInit() {

    if (this.userData) {
      if (this.userData.user_profile.first_name) {
        this.profile = this.userData.user_profile;
      } else {
        this.profile = this.userData.user_profile_default;
      }
    }
  }


  showProfile() {

    if (this.showLink && this.profile.is_active) {
      this.router.navigate(['/user-profile/' + this.userData.user_profile.slug + '/' + this.locale]);
      this.itemClicked.emit();
    }
  }


  showProduct() {
    if (this.showLink && this.product && !this.product.deleted && this.product.published) {
      this.router.navigate([getProductLink(this.product) + '/' + this.locale]);
      this.itemClicked.emit();
    }

  }

  showPreviewPanel(event) {
    if (this.showPreview && this.previewPanel && this.profile.is_active) {
      this.previewPanel.showUserPreview(event, this.profile);
    }


  }

  showProductPreviewPanel(event) {
    if (this.showPreview && this.previewPanel) {
      this.previewPanel.showProductPreview(event, this.product);
    }
  }


  hidePreviewPanel() {


    if (this.showPreview && this.previewPanel) {
      this.previewPanel.hideDetails();
    }
  }

  onRate(event) {

    this.rated.emit(event.value);

  }

  onItemClicked() {
    this.itemClicked.emit();
  }


}
