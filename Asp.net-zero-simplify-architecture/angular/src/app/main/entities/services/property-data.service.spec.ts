import { TestBed } from '@angular/core/testing';

import { PropertyDataService } from './property-data.service';

describe('PropertyDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyDataService = TestBed.get(PropertyDataService);
    expect(service).toBeTruthy();
  });
});
