import { NgModule } from '@angular/core';
import {SelectProductGroupComponent} from './select-product-group.component';
import {SharedModule} from '../../../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectProductGroupComponent],
  imports: [
    SharedModule, AutoCompleteModule, FormsModule
  ],
  exports: [SelectProductGroupComponent]
})
export class SelectProductGroupModule { }
