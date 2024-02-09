import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProductsAdminComponent } from './company-products-admin.component';

describe('CompanyProductsAdminComponent', () => {
  let component: CompanyProductsAdminComponent;
  let fixture: ComponentFixture<CompanyProductsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProductsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
