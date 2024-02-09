import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductsAdminComponent } from './user-products-admin.component';

describe('UserProductsAdminComponent', () => {
  let component: UserProductsAdminComponent;
  let fixture: ComponentFixture<UserProductsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
