import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlPreviewComponent } from './url-preview.component';

describe('UrlPreviewComponent', () => {
  let component: UrlPreviewComponent;
  let fixture: ComponentFixture<UrlPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
