import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredPostsListComponent } from './filtered-posts-list.component';

describe('FilteredPostsListComponent', () => {
  let component: FilteredPostsListComponent;
  let fixture: ComponentFixture<FilteredPostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredPostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
