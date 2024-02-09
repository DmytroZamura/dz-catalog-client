import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsAdminComponent } from './user-posts-admin.component';

describe('UserPostsAdminComponent', () => {
  let component: UserPostsAdminComponent;
  let fixture: ComponentFixture<UserPostsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
