import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductGroupComponent } from './select-product-group.component';

describe('SelectProductGroupComponent', () => {
  let component: SelectProductGroupComponent;
  let fixture: ComponentFixture<SelectProductGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
