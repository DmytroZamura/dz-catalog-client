import { NgModule } from '@angular/core';
import {FileComponent} from './file.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProcessDialogModule} from '../process-dialog/process-dialog.module';



@NgModule({
  declarations: [FileComponent],
  imports: [
  SharedModule, ButtonModule, FileUploadModule, ImageCropperModule, DialogModule, ProgressSpinnerModule, ProcessDialogModule
  ],
  exports: [FileComponent]
})
export class FileModule { }
