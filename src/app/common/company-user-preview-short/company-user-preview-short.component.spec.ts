import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserPreviewShortComponent } from './company-user-preview-short.component';

describe('CompanyUserPreviewShortComponent', () => {
  let component: CompanyUserPreviewShortComponent;
  let fixture: ComponentFixture<CompanyUserPreviewShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUserPreviewShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserPreviewShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
