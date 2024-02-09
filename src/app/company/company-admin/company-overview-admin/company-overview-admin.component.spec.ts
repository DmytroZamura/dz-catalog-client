import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOverviewAdminComponent } from './company-overview-admin.component';

describe('CompanyOverviewAdminComponent', () => {
  let component: CompanyOverviewAdminComponent;
  let fixture: ComponentFixture<CompanyOverviewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOverviewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOverviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
