import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleCategoriesComponent } from './select-multiple-categories.component';

describe('SelectMultipleCategoriesComponent', () => {
  let component: SelectMultipleCategoriesComponent;
  let fixture: ComponentFixture<SelectMultipleCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultipleCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultipleCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
