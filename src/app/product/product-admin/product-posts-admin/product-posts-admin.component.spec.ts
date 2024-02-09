import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPostsAdminComponent } from './product-posts-admin.component';

describe('ProductPostsAdminComponent', () => {
  let component: ProductPostsAdminComponent;
  let fixture: ComponentFixture<ProductPostsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPostsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
