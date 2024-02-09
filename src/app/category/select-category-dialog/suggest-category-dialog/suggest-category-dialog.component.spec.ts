import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestCategoryDialogComponent } from './suggest-category-dialog.component';

describe('SuggestCategoryDialogComponent', () => {
  let component: SuggestCategoryDialogComponent;
  let fixture: ComponentFixture<SuggestCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
