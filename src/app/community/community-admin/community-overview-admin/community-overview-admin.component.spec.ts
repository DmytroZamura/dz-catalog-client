import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityOverviewAdminComponent } from './community-overview-admin.component';

describe('CommunityOverviewAdminComponent', () => {
  let component: CommunityOverviewAdminComponent;
  let fixture: ComponentFixture<CommunityOverviewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityOverviewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityOverviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
