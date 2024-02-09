import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRespondComponent } from './post-respond.component';

describe('PostRespondComponent', () => {
  let component: PostRespondComponent;
  let fixture: ComponentFixture<PostRespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
