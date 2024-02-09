import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOptionVotesComponent } from './post-option-votes.component';

describe('PostOptionVotesComponent', () => {
  let component: PostOptionVotesComponent;
  let fixture: ComponentFixture<PostOptionVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOptionVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOptionVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
