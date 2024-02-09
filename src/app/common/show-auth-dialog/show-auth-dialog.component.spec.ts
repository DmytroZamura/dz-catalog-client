import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuthDialogComponent } from './show-auth-dialog.component';

describe('ShowAuthDialogComponent', () => {
  let component: ShowAuthDialogComponent;
  let fixture: ComponentFixture<ShowAuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAuthDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
