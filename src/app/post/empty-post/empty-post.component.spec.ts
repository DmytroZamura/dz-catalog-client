import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPostComponent } from './empty-post.component';

describe('EmptyPostComponent', () => {
  let component: EmptyPostComponent;
  let fixture: ComponentFixture<EmptyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
