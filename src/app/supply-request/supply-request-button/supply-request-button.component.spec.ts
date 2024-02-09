import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestButtonComponent } from './supply-request-button.component';

describe('SupplyRequestButtonComponent', () => {
  let component: SupplyRequestButtonComponent;
  let fixture: ComponentFixture<SupplyRequestButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyRequestButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
