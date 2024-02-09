import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectUserOrCompanyComponent} from './select-user-or-company.component';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import {TabMenuModule} from 'primeng/tabmenu';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SelectUserOrCompanyComponent],
  imports: [
    CommonModule, DropdownModule, ListboxModule, TabMenuModule, FormsModule
  ],
  exports: [SelectUserOrCompanyComponent]
})
export class SelectUserOrCompanyModule { }
