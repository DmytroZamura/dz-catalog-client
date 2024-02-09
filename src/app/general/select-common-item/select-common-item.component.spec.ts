import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCommonItemComponent } from './select-common-item.component';

describe('SelectCommonItemComponent', () => {
  let component: SelectCommonItemComponent;
  let fixture: ComponentFixture<SelectCommonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCommonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCommonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
