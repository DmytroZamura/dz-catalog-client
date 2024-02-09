import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListAgileComponent } from './items-list-agile.component';

describe('ItemsListAgileComponent', () => {
  let component: ItemsListAgileComponent;
  let fixture: ComponentFixture<ItemsListAgileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListAgileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListAgileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
