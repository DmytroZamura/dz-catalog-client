import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserOrCompanyComponent } from './select-user-or-company.component';

describe('SelectUserOrCompanyComponent', () => {
  let component: SelectUserOrCompanyComponent;
  let fixture: ComponentFixture<SelectUserOrCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUserOrCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserOrCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
