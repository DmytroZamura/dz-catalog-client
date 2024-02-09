import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRespondsListComponent } from './post-responds-list.component';

describe('PostRespondsListComponent', () => {
  let component: PostRespondsListComponent;
  let fixture: ComponentFixture<PostRespondsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRespondsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRespondsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
