import { NgModule } from '@angular/core';
import {InplaceTextEditorComponent} from './inplace-text-editor.component';
import {SharedModule} from '../../shared/shared.module';
import {InplaceModule} from 'primeng/inplace';
import {TextShowMoreModule} from '../text-show-more/text-show-more.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [InplaceTextEditorComponent],
  imports: [
    SharedModule, InplaceModule, TextShowMoreModule, InputTextareaModule, ButtonModule, FormsModule
  ],
  exports: [InplaceTextEditorComponent]
})
export class InplaceTextEditorModule { }
