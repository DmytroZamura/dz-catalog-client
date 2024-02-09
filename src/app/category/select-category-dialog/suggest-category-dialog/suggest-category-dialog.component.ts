import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, SuggestedCategory} from '../../category';
import {CategoryService} from '../../category.service';
import {StandardMessageService} from '../../../standard-message.service';

@Component({
  selector: 'app-suggest-category-dialog',
  templateUrl: './suggest-category-dialog.component.html',
  styleUrls: ['./suggest-category-dialog.component.css']
})
export class SuggestCategoryDialogComponent implements OnInit {
  @Input() parentCategory: Category;
  @Input() currentUserId: number;
  @Output() categorySuggested = new EventEmitter<SuggestedCategory>();
  showDialog = false;
  suggestion: SuggestedCategory;
  saveDisabled = false;

  constructor(private categoryService: CategoryService, private messageService: StandardMessageService,) {
  }

  ngOnInit() {
  }

  saveSuggestion() {
    this.saveDisabled = true;

    this.categoryService.suggestCategory(this.suggestion)
      .then(category => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Status',
          detail: 'Suggestion message'
        });

        this.categorySuggested.emit(category);
        this.saveDisabled = false;
        this.showDialog = false;

      })
      .catch(error => {
        console.log(error);
      });
  }

  onCancel() {

    this.showDialog = false;
    this.suggestion = null;
    this.parentCategory = null;
  }

  showSuggestionDialog(parent: Category) {
    this.suggestion = new SuggestedCategory();
    this.parentCategory = parent;
    this.suggestion.user = this.currentUserId;
    if (this.parentCategory) {
      this.suggestion.parent = this.parentCategory.id;
    }

    this.showDialog = true;
  }

}
