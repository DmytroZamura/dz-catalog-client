import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewAdminComponent } from './user-overview-admin.component';

describe('UserOverviewAdminComponent', () => {
  let component: UserOverviewAdminComponent;
  let fixture: ComponentFixture<UserOverviewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOverviewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
