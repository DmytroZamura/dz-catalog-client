import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCompanyButtonComponent } from './follow-company-button.component';

describe('FollowCompanyButtonComponent', () => {
  let component: FollowCompanyButtonComponent;
  let fixture: ComponentFixture<FollowCompanyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowCompanyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowCompanyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
