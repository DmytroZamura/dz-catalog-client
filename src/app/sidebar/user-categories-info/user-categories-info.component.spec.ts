import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoriesInfoComponent } from './user-categories-info.component';

describe('UserCategoriesInfoComponent', () => {
  let component: UserCategoriesInfoComponent;
  let fixture: ComponentFixture<UserCategoriesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCategoriesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCategoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
