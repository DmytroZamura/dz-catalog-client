import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedPreviewComponent } from './user-feed-preview.component';

describe('UserFeedPreviewComponent', () => {
  let component: UserFeedPreviewComponent;
  let fixture: ComponentFixture<UserFeedPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
