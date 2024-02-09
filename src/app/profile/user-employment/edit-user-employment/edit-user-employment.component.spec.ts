import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserEmploymentComponent } from './edit-user-employment.component';

describe('EditUserEmploymentComponent', () => {
  let component: EditUserEmploymentComponent;
  let fixture: ComponentFixture<EditUserEmploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserEmploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
