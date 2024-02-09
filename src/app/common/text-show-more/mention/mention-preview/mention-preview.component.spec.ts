import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionPreviewComponent } from './mention-preview.component';

describe('MentionPreviewComponent', () => {
  let component: MentionPreviewComponent;
  let fixture: ComponentFixture<MentionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
