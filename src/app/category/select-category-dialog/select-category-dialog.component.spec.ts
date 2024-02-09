import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryDialogComponent } from './select-category-dialog.component';

describe('SelectCategoryDialogComponent', () => {
  let component: SelectCategoryDialogComponent;
  let fixture: ComponentFixture<SelectCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
