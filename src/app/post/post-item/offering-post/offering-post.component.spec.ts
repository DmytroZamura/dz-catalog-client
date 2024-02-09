import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingPostComponent } from './offering-post.component';

describe('OfferingPostComponent', () => {
  let component: OfferingPostComponent;
  let fixture: ComponentFixture<OfferingPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
