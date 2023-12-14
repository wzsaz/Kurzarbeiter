import { TestBed } from '@angular/core/testing';

import { MockDataServiceService } from './mock-data-service.service';

describe('MockDataServiceService', () => {
  let service: MockDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
