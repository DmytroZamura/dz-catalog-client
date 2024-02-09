import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestItemComponent } from './supply-request-item.component';

describe('SupplyRequestItemComponent', () => {
  let component: SupplyRequestItemComponent;
  let fixture: ComponentFixture<SupplyRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
