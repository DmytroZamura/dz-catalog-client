import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesDialogComponent } from './likes-dialog.component';

describe('LikesDialogComponent', () => {
  let component: LikesDialogComponent;
  let fixture: ComponentFixture<LikesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
