import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWizardComponent } from './product-wizard.component';

describe('ProductWizardComponent', () => {
  let component: ProductWizardComponent;
  let fixture: ComponentFixture<ProductWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
