import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAttributesComponent } from './object-attributes.component';

describe('ObjectAttributesComponent', () => {
  let component: ObjectAttributesComponent;
  let fixture: ComponentFixture<ObjectAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
