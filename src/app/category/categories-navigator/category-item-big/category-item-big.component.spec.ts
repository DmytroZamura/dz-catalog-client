import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemBigComponent } from './category-item-big.component';

describe('CategoryItemBigComponent', () => {
  let component: CategoryItemBigComponent;
  let fixture: ComponentFixture<CategoryItemBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
