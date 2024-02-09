import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UrlPreview} from './url-preview';


import {Router} from '@angular/router';
import {GeneralService} from '../../general/general.service';



@Component({
  selector: 'app-url-preview',
  templateUrl: './url-preview.component.html',
  styleUrls: ['./url-preview.component.css']
})
export class UrlPreviewComponent implements OnInit {
  @Input() urlPreview: UrlPreview;
  @Input() showImage = true;
  @Input() showDescription = true;
  @Input() size = 2;
  @Input() checkDescription = true;
  @Input() bgClass = 'bg-light';
  @Input() editMode = false;
  @Input() externalLink = true;

  @Output() newPreview = new EventEmitter<UrlPreview>();
  @Output() linkClicked = new EventEmitter<void>();
  url: string;
  isVideoUrl = false;
  embedFrame: any;



  constructor(private service: GeneralService, private router: Router) {
  }

  ngOnInit() {

    if (this.urlPreview) {
      if (this.urlPreview.is_video_url) {
        this.isVideoUrl = true;
        this.checkUrlOnVideo(this.urlPreview.url);
      }

      if (this.checkDescription) {
        if (this.urlPreview.title) {
          if (this.urlPreview.title.length > 50 && this.urlPreview.image && !this.urlPreview.is_video_url) {
            this.showDescription = false;
          }
        }
      }
    }

  }

  checkUrlOnVideo(url: string) {


  }

  onLinkClicked() {
    this.linkClicked.emit();
  }

  public getUrlPreview(url: string): void {


    if (url) {

      this.checkUrlOnVideo(url);
      if (!this.isVideoUrl) {

        this.url = url;


        const urlPreviewResult = new UrlPreview();
        urlPreviewResult.url = this.url;

        this.service.updateItem('get_url_preview', urlPreviewResult)
        .then(review => {
        if (review.title) {
          if (review.title.length > 300) {
            review.title = review.title.substring(0, 300);
          }
        }

            if (review.description) {
              if (review.description.length > 500) {
                review.description = review.description.substring(0, 500);
              }
            }

            if (review.site_name) {
              if (review.site_name.length > 50) {
                review.site_name = review.site_name.substring(0, 50);
              }
            }


            this.urlPreview = review;
            this.urlPreview.url = url;
            this.urlPreview.is_video_url = false;
            this.newPreview.emit(this.urlPreview);

          })
          .catch(error => {
            this.urlPreview = null;
            this.newPreview.emit(this.urlPreview);
            console.log(error);

          });

        // this.urlPreviewService.getUrlPreview(urlPreviewResult)
        //   .then(review => {
        // if (review.title) {
        //   if (review.title.length > 300) {
        //     review.title = review.title.substring(0, 300);
        //   }
        // }
        //
        //     if (review.description) {
        //       if (review.description.length > 500) {
        //         review.description = review.description.substring(0, 500);
        //       }
        //     }
        //
        //     if (review.site_name) {
        //       if (review.site_name.length > 50) {
        //         review.site_name = review.site_name.substring(0, 50);
        //       }
        //     }
        //
        //
        //     this.urlPreview = review;
        //     this.urlPreview.url = url;
        //     this.urlPreview.is_video_url = false;
        //     this.newPreview.emit(this.urlPreview);
        //
        //   })
        //   .catch(error => {
        //     this.urlPreview = null;
        //     this.newPreview.emit(this.urlPreview);
        //     console.log(error);
        //
        //   });
      } else {
        this.urlPreview = new UrlPreview();
        this.urlPreview.url = url;
        this.urlPreview.title = 'Video Content';
        this.urlPreview.is_video_url = true;
        this.newPreview.emit(this.urlPreview);
      }
    }
  }

  goToLink() {
     this.router.navigate([this.urlPreview.url]);
  }

}
