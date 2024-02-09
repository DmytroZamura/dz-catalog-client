import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesHomeComponent } from './communities-home.component';

describe('CommunitiesHomeComponent', () => {
  let component: CommunitiesHomeComponent;
  let fixture: ComponentFixture<CommunitiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
