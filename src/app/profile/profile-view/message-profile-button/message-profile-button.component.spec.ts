import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageProfileButtonComponent } from './message-profile-button.component';

describe('MessageProfileButtonComponent', () => {
  let component: MessageProfileButtonComponent;
  let fixture: ComponentFixture<MessageProfileButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageProfileButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageProfileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
