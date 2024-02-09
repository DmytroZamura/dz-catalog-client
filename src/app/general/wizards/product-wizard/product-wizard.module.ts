import {NgModule, Type} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {SelectProductGroupModule} from './select-product-group/select-product-group.module';
import {ProductWizardComponent} from './product-wizard.component';
import {FormsModule} from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {SelectUserOrCompanyModule} from '../../../common/select-user-or-company/select-user-or-company.module';
import {SelectCategoryModule} from '../../../category/select-category/select-category.module';


@NgModule({
  declarations: [ProductWizardComponent],
  imports: [
    SharedModule, SelectProductGroupModule, SelectUserOrCompanyModule,
    FormsModule, SelectButtonModule, InputTextModule,
    InputTextareaModule, ButtonModule, SelectCategoryModule

  ],
  exports: [ProductWizardComponent]
})
export class ProductWizardModule {

}
