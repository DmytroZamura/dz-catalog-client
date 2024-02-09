import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRespondsViewComponent } from './post-responds-view.component';

describe('PostRespondsViewComponent', () => {
  let component: PostRespondsViewComponent;
  let fixture: ComponentFixture<PostRespondsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRespondsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRespondsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
