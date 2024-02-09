import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFeedComponent } from './community-feed.component';

describe('CommunityFeedComponent', () => {
  let component: CommunityFeedComponent;
  let fixture: ComponentFixture<CommunityFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
