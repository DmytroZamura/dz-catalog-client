import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JopPostComponent } from './jop-post.component';

describe('JopPostComponent', () => {
  let component: JopPostComponent;
  let fixture: ComponentFixture<JopPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JopPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JopPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
