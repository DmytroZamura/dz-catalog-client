import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FavoriteCompany, FavoritePost, FavoriteProduct} from './favorite';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {
  @Input() objectType = 'post';
  @Input() id: number;
  @Input() currentUserId: number;
  @Input() favoriteStatus = false;
  @Output() buttonClicked = new EventEmitter<boolean>();

  icon = 'pi-bookmark';


  constructor( private service1: GeneralService,
              private messageService: StandardMessageService, public app: AppComponent) {
  }

  ngOnInit() {
    this.setIcon();
  }

  setIcon() {
    if (this.favoriteStatus) {
      this.icon = 'pi-bookmark';
    } else {
      this.icon = 'pi-bookmark';
    }


  }

  onButtonClick() {


    if (this.app.appService.isAuthenticated()) {

      if (!this.favoriteStatus) {
        this.setFavoriteStatus();
      } else {
        this.setUnFavoriteStatus();
      }
    } else {
      this.app.appService.showAuthDialog = true;
    }

  }

  setFavoriteStatus() {
    if (this.objectType === 'post') {
      const obj = new FavoritePost();
      obj.user = this.currentUserId;
      obj.post = this.id;

      const endpoint = `${'create-favorite-post'}`;
      this.service1.createItem(endpoint, obj)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully saved'
          });


        })
        .catch(error => {
          console.log(error);
        });


    }
    if (this.objectType === 'company') {
      const obj = new FavoriteCompany();
      obj.user = this.currentUserId;
      obj.company = this.id;
      const endpoint = `${'create-favorite-company'}`;
      this.service1.createItem(endpoint, obj)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully saved'
          });


        })
        .catch(error => {
          console.log(error);
        });


    }
    if (this.objectType === 'product') {
      const obj = new FavoriteProduct();
      obj.user = this.currentUserId;
      obj.product = this.id;

      const endpoint = `${'create-favorite-product'}`;
      this.service1.createItem(endpoint, obj)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully saved'
          });


        })
        .catch(error => {
          console.log(error);
        });


    }
  }

  setUnFavoriteStatus() {
    if (this.objectType === 'post') {

      const endpoint = `${'delete-favorite-post/'}`;
      this.service1.deleteItemByPk(endpoint, this.id)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully removed'
          });
        })
        .catch(error => {
          console.log(error);
        });


    }
    if (this.objectType === 'company') {
      const endpoint = `${'delete-favorite-company/'}`;

      this.service1.deleteItemByPk(endpoint, this.id)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully removed'
          });

        })
        .catch(error => {
          console.log(error);
        });


    }
    if (this.objectType === 'product') {

      const endpoint = `${'delete-favorite-product/'}`;

      this.service1.deleteItemByPk(endpoint, this.id)
        .then(res => {
          this.app.newTimestamp();
          this.emitStatus();
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Favorite',
            detail: 'Successfully removed'
          });
        })
        .catch(error => {
          console.log(error);
        });


    }
  }

  emitStatus() {
    this.favoriteStatus = !this.favoriteStatus;
    this.setIcon();
    this.buttonClicked.emit(this.favoriteStatus);
  }


}
