import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPreviewShortComponent } from './company-preview-short.component';

describe('CompanyPreviewShortComponent', () => {
  let component: CompanyPreviewShortComponent;
  let fixture: ComponentFixture<CompanyPreviewShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPreviewShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPreviewShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
