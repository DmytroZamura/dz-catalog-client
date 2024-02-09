import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {CompanyShort} from '../../company/company';
import {PreviewOverlayPanelComponent} from '../preview-overlay-panel/preview-overlay-panel.component';
import {getProductLink, ProductShort} from '../../product/product';

@Component({
  selector: 'app-company-preview-short',
  templateUrl: './company-preview-short.component.html',
  styleUrls: ['./company-preview-short.component.css']
})
export class CompanyPreviewShortComponent implements OnInit {
  @Input() company: CompanyShort;
  @Input() product: ProductShort;
  @Input() showInfo = true;
  @Input() currentUser = 0;
  @Input() showLink = true;
  @Input() message: string;
  @Input() truncate_number = 18;
  @Input() locale = 'en';
  @Input() showSlug = false;
  @Input() size = 'middle'; // small, middle
  @Input() currencyCode = 'USD';
  @Input() showPreview = false;
  @Input() rating: number;
  @Input() editRating = false;
  @Output() rated = new EventEmitter<number>();
  @Output() itemClicked = new EventEmitter<void>();
  @ViewChild('previewpanel') previewPanel: PreviewOverlayPanelComponent;


  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  showCompany() {

    if (this.showLink && !this.company.deleted) {
      this.router.navigate(['/company/' + this.company.slug + '/' + this.locale]);
      this.itemClicked.emit();
    }


  }

  showProduct() {
    if (this.showLink && this.product && !this.product.deleted) {
      this.router.navigate([getProductLink(this.product) + '/' + this.locale]);
      this.itemClicked.emit();
    }


  }

  showPreviewPanel(event) {
    if (this.showPreview && this.previewPanel) {
      this.previewPanel.showCompanyPreview(event, this.company);
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
