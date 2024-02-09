import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductImage} from '../../product';
import {ProductImageService} from '../product-image.service';

import {StandardMessageService} from '../../../standard-message.service';
import {GalleryImage} from '../../../common/images-list/gallery-image';


@Component({
  selector: 'app-product-image-view',
  templateUrl: './product-image-view.component.html',
  styleUrls: ['./product-image-view.component.css']
})
export class ProductImageViewComponent implements OnInit {
  @Input() product_id: number;
  @Input() images: ProductImage[];
  @Input() edit_mode = false;
  @Input() isBrowser = true;
  @Input() isMobile = false;
  @Output() imageDeleted = new EventEmitter<number>();
  @Output() previewOpened = new EventEmitter<void>();
  galleryImages: GalleryImage[];
  fullScreen = false;


  index = 0;
  selected_product_image: ProductImage;

  loading = false;
  showFirstGallery = true;

  constructor(private productImageService: ProductImageService, private messageService: StandardMessageService) {
  }

  ngOnInit() {


    if (this.isBrowser && this.images.length > 0) {

      this.initGalleriaImages();


    }
  }

  initGalleriaImages() {
    this.galleryImages = [];
    const galleryImages: GalleryImage[] = [];
    //
    for (const image of this.images) {

      if (image.image_details) {
        galleryImages.push({
          previewImageSrc: image.image_details.file_url,
          thumbnailImageSrc: image.image_details.small_image_url,
          title: image.image_details.name,
          alt: image.image_details.name
        });


      }


    }
    this.galleryImages = galleryImages;

    if (this.images[0]) {
      this.index = 0;
      this.selected_product_image = this.images[0];

    }


  }

  deleteImage() {
    this.loading = true;
    this.productImageService.deleteProductImage(this.selected_product_image.id)
      .then(res => {

          this.images.splice(this.index, 1);
          this.galleryImages.splice(this.index, 1);
          if (!this.galleryImages[0]) {
            this.selected_product_image = null;
            this.index = null;
          } else {
            this.index = 0;
            this.selected_product_image = this.images[0];
          }


          this.showFirstGallery = !this.showFirstGallery;




          this.loading = false;
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Image',
            detail: 'Successfully deleted'
          });


        }
      )
      .catch(error => {
        this.handleError(error);
      });


  }

  onImageChange(index: number) {


    this.index = index;
    this.selected_product_image = this.images[this.index];

  }

  onFileUpload(event) {
    this.loading = true;
    // if (!this.galleryImages) {
    //
    //   this.galleryImages = [];
    //   this.product_images = [];
    //   // this.show_images = true;
    // }

    const product_image = new ProductImage();
    product_image.image_details = event;
    product_image.image = event.id;
    product_image.product = this.product_id;

    this.productImageService.createProductImage(product_image)
      .then(image => {

          this.index = 0;
          if (!this.images) {
            this.images = [];
          }

          if (!this.galleryImages) {

            this.galleryImages = [];
          }

          // this.images.push(image);

          // this.galleryImages.splice(0, 0, {
          //   thumbnailImageSrc: image.image_details.small_image_url, previewImageSrc: image.image_details.medium_image_url,
          //   alt: image.description,
          //   title: image.image_details.name
          // });

          this.images.splice(0, 0, image);
          this.galleryImages.splice(0, 0, {
            thumbnailImageSrc: image.image_details.small_image_url, previewImageSrc: image.image_details.file_url,
            alt: image.description,
            title: image.image_details.name
          });

          // this.galleryImages.push({
          //   thumbnailImageSrc: image.image_details.small_image_url, previewImageSrc: image.image_details.medium_image_url,
          //   alt: image.description,
          //   title: image.image_details.name
          // });
          this.showFirstGallery = !this.showFirstGallery;

          // const images = this.galleryImages;
          // this.galleryImages = [];
          this.loading = false;
          // this.galleryImages = this.galleryImages.concat(images);
          this.index = 0;
          this.selected_product_image = this.images[this.index];
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Image',
            detail: 'Successfully uploaded'
          });


        }
      )
      .catch(error => {
        this.handleError(error);
      });


  }

  onPreviewOpened() {
    this.previewOpened.emit();
  }

  onGalleryClick() {
    if (this.isMobile) {
      this.showFullScreen();
    }
  }

  showFullScreen() {
    if (!this.fullScreen) {
      this.previewOpened.emit();
    }
    this.fullScreen = !this.fullScreen;
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }
}
