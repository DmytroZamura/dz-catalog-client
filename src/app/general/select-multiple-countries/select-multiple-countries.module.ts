import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectMultipleCountriesComponent} from './select-multiple-countries.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectMultipleCountriesComponent],
  imports: [
    CommonModule, AutoCompleteModule, FormsModule
  ],
  exports: [SelectMultipleCountriesComponent]
})
export class SelectMultipleCountriesModule { }
