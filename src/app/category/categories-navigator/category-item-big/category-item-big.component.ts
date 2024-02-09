import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../category';

@Component({
  selector: 'app-category-item-big',
  templateUrl: './category-item-big.component.html',
  styleUrls: ['./category-item-big.component.css']
})
export class CategoryItemBigComponent implements OnInit {


  @Input() category: Category;
  @Input() carouselView = false;
  @Input() productView = false;
  @Output() categorySelect = new EventEmitter<Category>();


  constructor() {
  }

  ngOnInit() {


  }

  public getBackground() {
    let backgroundImage = 'static/assets/img/default-category-background.jpg';
    if (this.category.background_image) {
      backgroundImage = this.category.background_image_url;
    }
    return {'background': `center / cover no-repeat linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`};
  }

  onClick() {
    this.categorySelect.emit(this.category);
  }


}
