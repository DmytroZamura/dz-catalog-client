import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextShowMoreComponent } from './text-show-more.component';

describe('TextShowMoreComponent', () => {
  let component: TextShowMoreComponent;
  let fixture: ComponentFixture<TextShowMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextShowMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextShowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
