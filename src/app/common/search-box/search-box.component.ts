import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import {SearchService} from './search.service';
import {OverlayPanel} from 'primeng/overlaypanel';
import {Suggestion} from './suggestion';
import {Router} from '@angular/router';
import {AppFilterService} from '../../app-filter.service';
import {Category} from '../../category/category';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {


  @Input() showLeftButton = false;
  @Input() showRightButton = true;
  @Input() showRightIcon = false;
  @Input() suggestions = false;
  @Input() placeholder: string;
  @Input() inputgroupClass = '';
  @Input() searchId = 'seacrh';
  @Input() inputClass = '';
  @Input() rightIconClass = '';
  @Input() onlyButtonEvent = false;
  @Input() showSearchLabel = true;
  @Input() itemsType; // -- 'feed', 'people' , 'products', 'companies' , 'responds', 'requests'
  @Input() userType: string; // - owner, responder


  @Input() keyword = '';



  @Output() searchKeyword = new EventEmitter<string>();
  @ViewChild('suggestionsPanel') previewPanel: OverlayPanel;
  @ViewChild('searchGroup') searchBoxComponent: ElementRef;


  panelShown = false;
  queryField: FormControl = new FormControl();
  suggestionItems: Suggestion[];
  event: any;
  truncateNumber = 35;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.hidePanel();
  }

  constructor(private searchService: SearchService, private router: Router, private filterService: AppFilterService) {
  }


  ngOnInit() {

    // if (this.isMobile) {
    //   this.truncateNumber = 35;
    // }
    this.queryField.valueChanges
      .pipe(debounceTime(500),
      distinctUntilChanged())
      .subscribe(result => {

          if (result >= '') {
            this.keyword = result;
            if (this.suggestions) {
              this.getSuggetions();
            }
            if (!this.onlyButtonEvent) {
              this.searchKeyword.emit(result);

            }
          }
        }
      );
  }


  getSuggetions() {
    if (this.keyword.length > 1) {
      this.searchService.getSuggestions(this.keyword)
        .then(items => {

          if (items.length > 0) {

            this.suggestionItems = items;

            this.showPreviewPanel();

          } else {
            this.hidePanel();
            this.suggestionItems = [];
          }


        })
        .catch(error => {
          this.hidePanel();
          this.suggestionItems = [];
          console.log(error);
        });
    } else {
      this.hidePanel();
    }
  }


  hidePanel() {

    if (this.panelShown) {
      this.previewPanel.hide();
    }
  }

  onSearch() {
    if (this.keyword) {
      this.searchKeyword.emit(this.keyword);


    }
  }

  onKeyUp(event) {
    this.event = event;
    if (event.code === 'Enter') {
      if (event.target.value) {
        this.searchKeyword.emit(event.target.value);


      }
    }


  }


  showPreviewPanel() {
    if (this.previewPanel && !this.panelShown) {
      this.previewPanel.show(this.event, this.searchBoxComponent.nativeElement);
    }
  }

  onPanelShown() {
    this.panelShown = true;
  }

  onPanelHide() {
    this.panelShown = false;
  }

  clearKeyword() {
    this.keyword = '';
  }

  applySuggestion(suggestion: Suggestion) {
    this.hidePanel();
    this.keyword = '';
    if (suggestion.type === 'user') {
      this.router.navigate(['/user-profile/' + suggestion.slug]);
    }
    if (suggestion.type === 'company') {
      this.router.navigate(['/company/' + suggestion.slug]);
    }
    if (suggestion.type === 'tag') {
      this.router.navigate(['/hashtag/' + suggestion.name]);
    }
    if (suggestion.type === 'community') {
      this.router.navigate(['/community/' + suggestion.id]);
    }
    if (suggestion.type === 'product') {
      this.router.navigate(['/product/' + suggestion.id]);
    }
    if (suggestion.type === 'category') {


      const category = new Category();
      category.name = suggestion.name;
      category.id = suggestion.id;
      category.image_url = suggestion.image;
      category.slug = suggestion.slug;
      category.small_image_url = suggestion.image;
      this.filterService.changeCategory(category, '/products', true);


    }


  }

}
