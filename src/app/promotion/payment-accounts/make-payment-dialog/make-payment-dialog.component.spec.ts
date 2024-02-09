import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentDialogComponent } from './make-payment-dialog.component';

describe('MakePaymentDialogComponent', () => {
  let component: MakePaymentDialogComponent;
  let fixture: ComponentFixture<MakePaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
