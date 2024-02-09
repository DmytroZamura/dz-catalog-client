import { TestBed } from '@angular/core/testing';

import { FaviconsService } from './favicons.service';

describe('FaviconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaviconsService = TestBed.get(FaviconsService);
    expect(service).toBeTruthy();
  });
});
