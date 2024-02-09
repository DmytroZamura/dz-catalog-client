import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOverviewAdminComponent } from './product-overview-admin.component';

describe('ProductOverviewAdminComponent', () => {
  let component: ProductOverviewAdminComponent;
  let fixture: ComponentFixture<ProductOverviewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOverviewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOverviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
