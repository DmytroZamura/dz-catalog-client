import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNavigatorComponent } from './filter-navigator.component';

describe('FilterNavigatorComponent', () => {
  let component: FilterNavigatorComponent;
  let fixture: ComponentFixture<FilterNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
