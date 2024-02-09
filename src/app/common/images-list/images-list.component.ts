import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ObjectImage} from '../object-file';
import {GalleryImage} from './gallery-image';

// import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent} from 'ngx-gallery';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {
  @Input() images: ObjectImage[];
  @Input() editMode = false;
  @Input() viewMode = true;
  @Input() isMobile = false;
  @Input() isBrowser = true;
  @Output() imageDeleted = new EventEmitter<number>();
  @Output() previewOpened = new EventEmitter<void>();
  // @ViewChild('gallery', {static: false}) previewGallery: NgxGalleryComponent;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  galleryImages: GalleryImage[];
  fullScreen = false;


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 4
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 4
    },
    {
      breakpoint: '560px',
      numVisible: 2
    }
  ];

  responsiveOptions2: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 7
    },
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 4
    },
    {
      breakpoint: '560px',
      numVisible: 4
    }
  ];


  constructor() {
  }


  ngOnInit() {


    if (this.isBrowser && this.images.length > 0) {

      const galleryImages: GalleryImage[] = [];
      //
      for (const image of this.images) {

        if (image.file_details) {
          galleryImages.push({
            previewImageSrc: image.file_details.medium_image_url,
            thumbnailImageSrc: image.file_details.small_image_url,
            title: image.file_details.name,
            alt: image.comment
          });


        }


      }

      this.galleryImages = galleryImages;



    }
    //   }
    // }
  }


  deleteImage(index: number) {

    this.imageDeleted.emit(index);

  }

  openPreview(): void {
    // this.previewGallery.openPreview(0);
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

}
