import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InplaceTextEditorComponent } from './inplace-text-editor.component';

describe('InplaceTextEditorComponent', () => {
  let component: InplaceTextEditorComponent;
  let fixture: ComponentFixture<InplaceTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InplaceTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
