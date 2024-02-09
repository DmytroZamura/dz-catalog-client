import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageViewComponent } from './product-image-view.component';

describe('ProductImageViewComponent', () => {
  let component: ProductImageViewComponent;
  let fixture: ComponentFixture<ProductImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
