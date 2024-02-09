import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemsListComponent } from './manage-items-list.component';

describe('ManageItemsListComponent', () => {
  let component: ManageItemsListComponent;
  let fixture: ComponentFixture<ManageItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
