import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrderingComponent } from './select-ordering.component';

describe('SelectOrderingComponent', () => {
  let component: SelectOrderingComponent;
  let fixture: ComponentFixture<SelectOrderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOrderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
