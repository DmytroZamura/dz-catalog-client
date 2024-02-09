import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreviewShortComponent } from './user-preview-short.component';

describe('UserPreviewShortComponent', () => {
  let component: UserPreviewShortComponent;
  let fixture: ComponentFixture<UserPreviewShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreviewShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreviewShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
