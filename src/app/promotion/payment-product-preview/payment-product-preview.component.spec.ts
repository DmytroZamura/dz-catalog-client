import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductPreviewComponent } from './payment-product-preview.component';

describe('PaymentProductPreviewComponent', () => {
  let component: PaymentProductPreviewComponent;
  let fixture: ComponentFixture<PaymentProductPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentProductPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentProductPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
