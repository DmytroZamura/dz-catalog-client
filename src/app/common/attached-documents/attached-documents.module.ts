import { NgModule } from '@angular/core';

import {AttachedDocumentsComponent} from './attached-documents.component';
import {SharedModule} from '../../shared/shared.module';
import {FileModule} from '../file/file.module';
import {FieldsetModule} from 'primeng/fieldset';



@NgModule({
  declarations: [AttachedDocumentsComponent],
  imports: [
    SharedModule, FileModule, FieldsetModule
  ],
  exports: [AttachedDocumentsComponent]
})
export class AttachedDocumentsModule { }
