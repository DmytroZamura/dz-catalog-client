import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderItemComponent } from './payment-order-item.component';

describe('PaymentOrderItemComponent', () => {
  let component: PaymentOrderItemComponent;
  let fixture: ComponentFixture<PaymentOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
