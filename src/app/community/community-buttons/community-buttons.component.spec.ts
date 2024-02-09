import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityButtonsComponent } from './community-buttons.component';

describe('CommunityButtonsComponent', () => {
  let component: CommunityButtonsComponent;
  let fixture: ComponentFixture<CommunityButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
