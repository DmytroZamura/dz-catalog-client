import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileCountiesInterestComponent} from './profile-counties-interest.component';
import {SelectMultipleCountriesModule} from '../../general/select-multiple-countries/select-multiple-countries.module';



@NgModule({
  declarations: [ProfileCountiesInterestComponent],
  imports: [
    CommonModule,
    SelectMultipleCountriesModule
  ],
  exports: [ProfileCountiesInterestComponent]
})
export class ProfileCountriesInterestModule { }
