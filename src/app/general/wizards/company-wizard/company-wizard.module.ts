import {NgModule, Type} from '@angular/core';

import {CompanyWizardComponent} from './company-wizard.component';
import {SharedModule} from '../../../shared/shared.module';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [CompanyWizardComponent],
  imports: [
    SharedModule, CheckboxModule,
    ButtonModule, InputTextModule, FormsModule
  ],
  exports: [CompanyWizardComponent]
})
export class CompanyWizardModule {

}
