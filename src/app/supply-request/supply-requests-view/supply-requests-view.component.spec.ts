import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestsViewComponent } from './supply-requests-view.component';

describe('SupplyRequestsViewComponent', () => {
  let component: SupplyRequestsViewComponent;
  let fixture: ComponentFixture<SupplyRequestsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
