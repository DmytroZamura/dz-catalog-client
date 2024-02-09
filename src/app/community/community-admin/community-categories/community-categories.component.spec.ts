import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCategoriesComponent } from './community-categories.component';

describe('CommunityCategoriesComponent', () => {
  let component: CommunityCategoriesComponent;
  let fixture: ComponentFixture<CommunityCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
