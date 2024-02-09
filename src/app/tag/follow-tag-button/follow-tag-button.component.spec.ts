import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowTagButtonComponent } from './follow-tag-button.component';

describe('FollowTagButtonComponent', () => {
  let component: FollowTagButtonComponent;
  let fixture: ComponentFixture<FollowTagButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowTagButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowTagButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
