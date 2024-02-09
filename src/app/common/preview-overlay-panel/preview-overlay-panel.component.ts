import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CompanyShort} from '../../company/company';
import {ProfileShort} from '../../profile/profile';
import {OverlayPanel} from 'primeng/overlaypanel';

import {ProductShort} from '../../product/product';

@Component({
  selector: 'app-preview-overlay-panel',
  templateUrl: './preview-overlay-panel.component.html',
  styleUrls: ['./preview-overlay-panel.component.css']
})
export class PreviewOverlayPanelComponent implements OnInit {
  @Input() company: CompanyShort;
  @Input() profile: ProfileShort;
  @Input() product: ProductShort;
  @Input() currencyCode = 'USD';
  @Input() currentUser = 0;
  @Input() isMobile = false;
  @Input() locale = 'en';
  @Output() itemClicked = new EventEmitter<void>();
  @ViewChild('preview') previewPanel: OverlayPanel;

  hidePanel = true;

  constructor() {
  }

  ngOnInit() {
  }

  showCompanyPreview(event, company: CompanyShort) {
    if (this.company !== company && this.hidePanel) {
      this.company = company;
      this.profile = null;
      this.product = null;

      this.showPanel(event);
    }
  }

  showUserPreview(event, userProfile: ProfileShort) {
    if (this.profile !== userProfile && this.hidePanel) {
      this.company = null;
      this.product = null;
      this.profile = userProfile;
      this.showPanel(event);
    }
  }

  showProductPreview(event, product: ProductShort) {
     if (this.product !== product && this.hidePanel) {
       this.company = null;
       this.product = product;
       this.profile = null;
       this.showPanel(event);
     }
  }

  showPanel(event) {
    this.hidePanel = false;
    setTimeout(() => {
      if (!this.hidePanel) {
        this.previewPanel.toggle(event);
      }
    }, 500);

  }

  onPanelHide() {
    this.company = null;
    this.product = null;
    this.profile = null;
    this.hidePanel = true;
  }

  onMouseOverPanel() {

       this.hidePanel = false;



  }

  hideDetails() {
    this.hidePanel = true;
    setTimeout(() => {
      if (this.hidePanel) {
        this.previewPanel.hide();
      }

    }, 500);

  }


  onItemClicked() {

    this.itemClicked.emit();
  }

}
