import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestsListComponent } from './supply-requests-list.component';

describe('SupplyRequestsListComponent', () => {
  let component: SupplyRequestsListComponent;
  let fixture: ComponentFixture<SupplyRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
