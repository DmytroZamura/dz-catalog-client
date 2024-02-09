import { NgModule } from '@angular/core';
import {ProcessDialogComponent} from './process-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';




@NgModule({
  declarations: [ProcessDialogComponent],
  imports: [
    SharedModule, DialogModule, ProgressSpinnerModule
  ],
  exports: [ProcessDialogComponent]
})
export class ProcessDialogModule { }
