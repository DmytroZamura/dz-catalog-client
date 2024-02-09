import { TestBed } from '@angular/core/testing';

import { StandardMessageService } from './standard-message.service';

describe('StandardMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardMessageService = TestBed.get(StandardMessageService);
    expect(service).toBeTruthy();
  });
});
