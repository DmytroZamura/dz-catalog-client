import { TestBed, inject } from '@angular/core/testing';

import { UserEmploymentService } from './user-employment.service';

describe('UserEmploymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEmploymentService]
    });
  });

  it('should be created', inject([UserEmploymentService], (service: UserEmploymentService) => {
    expect(service).toBeTruthy();
  }));
});
