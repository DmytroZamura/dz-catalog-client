import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesSearchComponent } from './companies-search.component';

describe('CompaniesSearchComponent', () => {
  let component: CompaniesSearchComponent;
  let fixture: ComponentFixture<CompaniesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
