import { NgModule } from '@angular/core';
import {SelectCompanyComponent} from './select-company.component';
import {SharedModule} from '../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectCompanyComponent],
  imports: [
    SharedModule, AutoCompleteModule, FormsModule
  ],
  exports: [SelectCompanyComponent]
})
export class SelectCompanyModule { }
