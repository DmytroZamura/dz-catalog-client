import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Type} from '@angular/core';


import {WizardsComponent} from './wizards.component';
import {NgxLazyElModule} from '@juristr/ngx-lazy-el';
import {DialogModule} from 'primeng/dialog';
import {SharedModule} from '../../shared/shared.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CreatePostModule} from '../../post/create-post/create-post.module';
import {ButtonModule} from 'primeng/button';
import {SelectUserOrCompanyModule} from '../../common/select-user-or-company/select-user-or-company.module';
import {ProductWizardModule} from './product-wizard/product-wizard.module';
import {CompanyWizardModule} from './company-wizard/company-wizard.module';
import {DeviceDetectorModule} from 'ngx-device-detector';


@NgModule({
  declarations: [WizardsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule, NgxLazyElModule,
    DialogModule, ScrollPanelModule,
    CreatePostModule, ButtonModule,
    SelectUserOrCompanyModule,
    ProductWizardModule,
    CompanyWizardModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [WizardsComponent]
})
export class WizardsModule {
  customElementComponent: Type<any> = WizardsComponent;
}
