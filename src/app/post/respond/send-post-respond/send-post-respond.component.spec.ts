import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPostRespondComponent } from './send-post-respond.component';

describe('SendPostRespondComponent', () => {
  let component: SendPostRespondComponent;
  let fixture: ComponentFixture<SendPostRespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPostRespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPostRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
