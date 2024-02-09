import { NgModule } from '@angular/core';

import {FilterAttributeComponent} from './filter-attribute/filter-attribute.component';
import {FilterAttributesComponent} from './filter-attributes.component';
import {GeneralService} from '../../general/general.service';
import {SharedModule} from '../../shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [FilterAttributeComponent, FilterAttributesComponent],
  imports: [
    SharedModule, DropdownModule, SliderModule, CheckboxModule, MultiSelectModule, InputTextModule, ButtonModule, FormsModule
  ],
  providers: [GeneralService],
  exports: [FilterAttributesComponent]
})
export class FilterAttributesModule { }
