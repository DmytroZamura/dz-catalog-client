import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingTypeComponent } from './offering-type.component';

describe('OfferingTypeComponent', () => {
  let component: OfferingTypeComponent;
  let fixture: ComponentFixture<OfferingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
