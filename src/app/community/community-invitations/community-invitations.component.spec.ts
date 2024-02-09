import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityInvitationsComponent } from './community-invitations.component';

describe('CommunityInvitationsComponent', () => {
  let component: CommunityInvitationsComponent;
  let fixture: ComponentFixture<CommunityInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
