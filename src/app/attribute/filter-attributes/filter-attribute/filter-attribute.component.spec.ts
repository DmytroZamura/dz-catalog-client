import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAttributeComponent } from './filter-attribute.component';

describe('FilterAttributeComponent', () => {
  let component: FilterAttributeComponent;
  let fixture: ComponentFixture<FilterAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
