import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCountiesInterestComponent } from './profile-counties-interest.component';

describe('ProfileCountiesInterestComponent', () => {
  let component: ProfileCountiesInterestComponent;
  let fixture: ComponentFixture<ProfileCountiesInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCountiesInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCountiesInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
