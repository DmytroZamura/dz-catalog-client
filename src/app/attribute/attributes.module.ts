import {NgModule} from '@angular/core';
import {ObjectAttributesComponent} from './object-attributes/object-attributes.component';
import {AttributeComponent} from './attribute.component';
import {GeneralService} from '../general/general.service';
import {SharedModule} from '../shared/shared.module';
import {InplaceModule} from 'primeng/inplace';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';


@NgModule({
  declarations: [ObjectAttributesComponent, AttributeComponent],
  imports: [
    SharedModule, InplaceModule, FormsModule, InputTextModule, DropdownModule, CheckboxModule, MultiSelectModule, ButtonModule, FieldsetModule
  ],
  providers: [GeneralService],
  exports: [ObjectAttributesComponent]
})
export class AttributesModule {
}
