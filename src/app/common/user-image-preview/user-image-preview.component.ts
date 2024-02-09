import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserImage} from '../file/file';
// import {NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';

@Component({
  selector: 'app-user-image-preview',
  templateUrl: './user-image-preview.component.html',
  styleUrls: ['./user-image-preview.component.css']
})
export class UserImagePreviewComponent implements OnInit {
  @Input() image: UserImage;
  @Input() className = '';
  @Input() editMode = false;
  @Output() imageDeleted = new EventEmitter<boolean>();
  // @ViewChild('gallery') previewGallery: NgxGalleryComponent;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];


  constructor() {
  }

  ngOnInit() {

    // if (!this.editMode && this.image) {
    //   this.galleryOptions = [];
    //   this.galleryOptions.push({
    //     image: false,
    //     thumbnails: false,
    //     width: '0px',
    //     height: '0px',
    //     previewCloseOnClick: true,
    //     previewCloseOnEsc: true,
    //     previewZoom: true,
    //     previewRotate: true,
    //   });
    //   this.galleryImages = [];
    //   this.galleryImages.push({
    //     small: this.image.file_url, medium: this.image.file_url,
    //     big: this.image.file_url
    //   });
    // }
  }

  onDeleted() {
    this.imageDeleted.emit(true);
  }

  openPreview(): void {
    // if (this.previewGallery && !this.editMode) {
    //   this.previewGallery.openPreview(0);
    // }
  }

}
