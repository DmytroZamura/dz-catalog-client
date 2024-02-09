import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSAuthComponent } from './awsauth.component';

describe('AWSAuthComponent', () => {
  let component: AWSAuthComponent;
  let fixture: ComponentFixture<AWSAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
