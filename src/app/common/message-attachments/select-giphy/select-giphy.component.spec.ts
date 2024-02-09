import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGiphyComponent } from './select-giphy.component';

describe('SelectGiphyComponent', () => {
  let component: SelectGiphyComponent;
  let fixture: ComponentFixture<SelectGiphyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGiphyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGiphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
