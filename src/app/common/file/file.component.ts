import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

import {FileService} from './file.service';
import {UserFile, UserImage} from './file';
import {ProcessDialogComponent} from '../process-dialog/process-dialog.component';
import {StandardMessageService} from '../../standard-message.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {


  @Input() accept = 'image/gif, image/jpeg, image/jpg';
  @Input() onlyIcon = false;
  @Input() imagePreview = false;
  @Input() image: UserImage;

  // @Input() imageCrop = false;
  @Input() icon = 'pi pi-paperclip';
  @Input() class = 'ui-button';
  @Input() label = 'Browse';
  @Input() cropImage = false;
  @Input() uploadImage = false;
  @Input() maxSize = 1000000;
  @Input() aspectRatio = 1;
  @Input() maintainAspectRatio = true;
  @Input() roundCropper = false;
  @Input() resizeToWidth = 600;
  @Input() cropperMinWidth = 600;
  @Input() onlyScaleDown = true;
  @Input() changeAspectRatio = false;


  @Output() fileUpload = new EventEmitter<UserFile>();
  @Output() startUploading = new EventEmitter<void>();
  @Output() stopUploading = new EventEmitter<void>();

  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;

  uploadedFiles: any [] = [];
  showDialog = false;
  imageChangedEvent: any = '';
  showCropper = false;
  loading = false;


  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;


  constructor(private fileService: FileService, private standardMessageService: StandardMessageService) {
  }

  ngOnInit() {


  }

  onCancel() {
    this.showDialog = false;
  }

  onUpload(event) {
    // this.startUploading.emit();
    if (!this.cropImage) {
      this.processDialogComponent.show();
    }
    if (event.target.files[0]) {

      this.uploadedFiles = [];


      for (const file of event.target.files) {
        this.uploadedFiles.push(file);

      }

      // this.file = event.target.files[0];
      // this.fileName = event.target.files[0].name;

      if (this.cropImage) {
        this.imageChangedEvent = event;

        this.showDialog = true;
        // this.dialog.center();
      } else {
        this.save();
      }
    }

  }

  onCroped() {
    this.loading = true;
    const object = Promise.resolve(this.imageCropper.crop('file'));

    object
      .then((res) => {


        const file: any = res.file;

        file.lastModifiedDate = new Date();
        file.name = this.uploadedFiles[0].name;
        this.uploadedFiles[0] = file;

        this.save();
      })
      .catch(error => {
        this.uploadedFiles = [];
        this.loading = false;
        console.log(error);
      });


  }


  save() {

    if (this.uploadedFiles[0]) {
      if (this.uploadedFiles[0].size <= this.maxSize) {


        if (this.cropImage || this.uploadImage) {
          this.fileService.uploadImage(this.uploadedFiles[0])
            .then(file => {
              this.loading = false;
              this.uploadedFiles = [];
              this.fileUpload.emit(file);
              if (!this.cropImage) {
                this.processDialogComponent.close();
              }
              if (this.imagePreview) {
                this.image = file;
              }

              this.showDialog = false;
            })
            .catch(error => {
              this.uploadedFiles = [];
              this.loading = false;
              console.log(error);
              // this.stopUploading.emit();
            });
        } else {
          this.fileService.uploadFile(this.uploadedFiles[0])
            .then(file => {
              this.loading = false;
              this.uploadedFiles = [];
              this.fileUpload.emit(file);
              this.showDialog = false;
              if (!this.cropImage) {
                this.processDialogComponent.close();
              }

            })
            .catch(error => {
              this.uploadedFiles = [];
              this.loading = false;
              // this.stopUploading.emit();
              console.log(error);
            });

        }
      } else {
        this.uploadedFiles = [];
        this.loading = false;
        this.stopUploading.emit();
        const maxSize = Math.round(this.maxSize / 1000000);
        const detail = 'Your file size is bigger than ' + maxSize + 'MB';
        this.processDialogComponent.close();
        this.standardMessageService.addMessage({
          severity: 'error',
          summary: 'An error occurred',
          detail: detail
        }, false);

        // this.msgs = [];
        // this.msgs.push({severity: 'error', summary: 'File', detail: detail});
        // this.msgPushed.emit({severity: 'error', summary: 'File', detail: detail});

      }


    }


  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    // this.croppedImage = event.file;
    // console.log(event.file);
  }

  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady() {
    // console.log('Cropper ready');
  }

  loadImageFailed() {
    // console.log('Load failed');
  }

  rotateLeft() {
    this.imageCropper.rotateLeft();
  }

  rotateRight() {
    this.imageCropper.rotateRight();
  }

  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }

  flipVertical() {
    this.imageCropper.flipVertical();
  }

  cropSquare() {
    this.aspectRatio = 1;
  }

  crop16x9() {
    this.aspectRatio = 16 / 9;
  }

  crop5x4() {
    this.aspectRatio = 5 / 4;
  }

  cropPortrait() {

    this.aspectRatio = 3 / 4;
  }

  deleteImage() {
    this.image = null;
    this.fileUpload.emit(this.image);
  }

  public getBackground() {
    let backgroundImage = '';
    if (this.image) {
      backgroundImage = this.image.file_url;
    }
    return {'background-image': `url(${backgroundImage})`};
  }


}
