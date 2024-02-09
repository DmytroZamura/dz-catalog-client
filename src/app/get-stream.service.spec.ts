import { TestBed } from '@angular/core/testing';

import { GetStreamService } from './get-stream.service';

describe('GetStreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStreamService = TestBed.get(GetStreamService);
    expect(service).toBeTruthy();
  });
});
