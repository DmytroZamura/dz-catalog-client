import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestPositionComponent } from './supply-request-position.component';

describe('SupplyRequestPositionComponent', () => {
  let component: SupplyRequestPositionComponent;
  let fixture: ComponentFixture<SupplyRequestPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
