import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFeedPreviewComponent } from './company-feed-preview.component';

describe('CompanyFeedPreviewComponent', () => {
  let component: CompanyFeedPreviewComponent;
  let fixture: ComponentFixture<CompanyFeedPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFeedPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFeedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
