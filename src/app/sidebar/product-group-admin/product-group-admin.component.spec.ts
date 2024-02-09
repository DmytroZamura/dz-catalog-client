import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupAdminComponent } from './product-group-admin.component';

describe('ProductGroupAdminComponent', () => {
  let component: ProductGroupAdminComponent;
  let fixture: ComponentFixture<ProductGroupAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
