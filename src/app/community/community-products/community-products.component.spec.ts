import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityProductsComponent } from './community-products.component';

describe('CommunityProductsComponent', () => {
  let component: CommunityProductsComponent;
  let fixture: ComponentFixture<CommunityProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
