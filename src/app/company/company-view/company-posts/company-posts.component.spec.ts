import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPostsComponent } from './company-posts.component';

describe('CompanyPostsComponent', () => {
  let component: CompanyPostsComponent;
  let fixture: ComponentFixture<CompanyPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
