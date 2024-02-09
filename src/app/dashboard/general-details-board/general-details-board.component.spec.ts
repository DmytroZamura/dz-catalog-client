import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDetailsBoardComponent } from './general-details-board.component';

describe('GeneralDetailsBoardComponent', () => {
  let component: GeneralDetailsBoardComponent;
  let fixture: ComponentFixture<GeneralDetailsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDetailsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDetailsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
