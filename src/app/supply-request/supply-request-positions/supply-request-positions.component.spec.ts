import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestPositionsComponent } from './supply-request-positions.component';

describe('SupplyRequestPositionsComponent', () => {
  let component: SupplyRequestPositionsComponent;
  let fixture: ComponentFixture<SupplyRequestPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
