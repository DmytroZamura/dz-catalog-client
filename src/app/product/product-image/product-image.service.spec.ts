import { TestBed, inject } from '@angular/core/testing';

import { ProductImageService } from './product-image.service';

describe('ProductImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductImageService]
    });
  });

  it('should be created', inject([ProductImageService], (service: ProductImageService) => {
    expect(service).toBeTruthy();
  }));
});
