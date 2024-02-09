import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAccountPreviewComponent } from './payment-account-preview.component';

describe('PaymentAccountPreviewComponent', () => {
  let component: PaymentAccountPreviewComponent;
  let fixture: ComponentFixture<PaymentAccountPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAccountPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAccountPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
