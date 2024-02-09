import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPostComponent } from './common-post.component';

describe('CommonPostComponent', () => {
  let component: CommonPostComponent;
  let fixture: ComponentFixture<CommonPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
