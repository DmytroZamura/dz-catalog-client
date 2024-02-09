import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from '../category';

import {GeneralService} from '../../general/general.service';
import {AutoComplete} from 'primeng/autocomplete';

@Component({
  selector: 'app-select-multiple-categories',
  templateUrl: './select-multiple-categories.component.html',
  styleUrls: ['./select-multiple-categories.component.css']
})
export class SelectMultipleCategoriesComponent implements OnInit {

  filteredCategories: Category[];

  @Input() categories: Category[];
  @Input() label = true;
  @Input() label_text: string;
  @Input() disabled = false;
  @Input() dropdown = true;
  @Output() categorySelect = new EventEmitter<Category>();
  @Output() categoryUnselect = new EventEmitter<Category>();
  @ViewChild('selectCategory') categoryComponent: AutoComplete;


  constructor(private service: GeneralService) {
  }

  ngOnInit() {


  }

   stopSpinner() {
    if (this.categoryComponent) {
      this.categoryComponent.loading = false;
    }


  }


  getFilteredCategories(event): void {
    if (event.query) {

      const url = `${'categories-search/'}${event.query}`;
      this.service.getItems(url)
      .then(categories => {

// TODO "this sorting we will use till solve an issue with hvad order_by"
          categories.sort(function (category1, category2) {
            if (category1.name_with_parent < category2.name_with_parent) {
              return -1;
            } else if (category1.name_with_parent > category2.name_with_parent) {
              return 1;
            } else {
              return 0;
            }
          });

          this.filteredCategories = categories;

        })
        .catch(error => {
          console.log(error);
        });



    }



  }


  onCategorySelect(event) {


    this.categorySelect.emit(event);


  }

  onDialogCategorySelect(event) {

    if (event.id) {

      this.categories.push(event);
      this.onCategorySelect(event);

    }
  }



   onCategoryUnselect(event) {


    this.categoryUnselect.emit(event);


  }




}
