import { NgModule } from '@angular/core';
import {FavoriteButtonComponent} from './favorite-button.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {GeneralService} from '../../general/general.service';



@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [
    SharedModule, ButtonModule
  ],
  providers: [GeneralService],
  exports: [FavoriteButtonComponent]
})
export class FavoriteButtonModule { }
