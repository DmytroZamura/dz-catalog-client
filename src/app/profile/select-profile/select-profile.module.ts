import { NgModule } from '@angular/core';
import {SelectProfileComponent} from './select-profile.component';
import {SharedModule} from '../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectProfileComponent],
  imports: [
    SharedModule, AutoCompleteModule, FormsModule
  ],
  exports: [SelectProfileComponent]
})
export class SelectProfileModule { }
