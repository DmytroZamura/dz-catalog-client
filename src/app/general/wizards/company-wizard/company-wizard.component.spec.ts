import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWizardComponent } from './company-wizard.component';

describe('CompanyWizardComponent', () => {
  let component: CompanyWizardComponent;
  let fixture: ComponentFixture<CompanyWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
