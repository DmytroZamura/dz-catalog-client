import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleCountriesComponent } from './select-multiple-countries.component';

describe('SelectMultipleCountriesComponent', () => {
  let component: SelectMultipleCountriesComponent;
  let fixture: ComponentFixture<SelectMultipleCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultipleCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultipleCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
