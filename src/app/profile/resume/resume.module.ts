import { NgModule } from '@angular/core';

import {ResumeComponent} from './resume.component';
import {SharedModule} from '../../shared/shared.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FileModule} from '../../common/file/file.module';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ResumeComponent],
  imports: [
    SharedModule, RadioButtonModule, CheckboxModule, ProgressSpinnerModule, FileModule, ButtonModule, FormsModule
  ],
  exports: [ResumeComponent]
})
export class ResumeModule { }
