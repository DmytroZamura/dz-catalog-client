import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOverlayPanelComponent } from './preview-overlay-panel.component';

describe('PreviewOverlayPanelComponent', () => {
  let component: PreviewOverlayPanelComponent;
  let fixture: ComponentFixture<PreviewOverlayPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewOverlayPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
