import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPostsAdminComponent } from './company-posts-admin.component';

describe('CompanyPostsAdminComponent', () => {
  let component: CompanyPostsAdminComponent;
  let fixture: ComponentFixture<CompanyPostsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPostsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
