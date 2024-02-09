import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowDocumentRoutingModule } from './show-document-routing.module';
import {ShowDocumentComponent} from './show-document.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TextShowMoreModule} from '../../common/text-show-more/text-show-more.module';
import {RouteTransformerModule} from '../../directives/route-transformer/route-transformer.module';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';



@NgModule({
  declarations: [ShowDocumentComponent],
  imports: [
    CommonModule,
    ShowDocumentRoutingModule,
    ProgressSpinnerModule,
    TextShowMoreModule,
    RouteTransformerModule,
    SafeHtmlModule
  ]
})
export class ShowDocumentModule { }
