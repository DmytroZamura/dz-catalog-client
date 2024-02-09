import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCompaniesComponent } from './community-companies.component';

describe('CommunityCompaniesComponent', () => {
  let component: CommunityCompaniesComponent;
  let fixture: ComponentFixture<CommunityCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
