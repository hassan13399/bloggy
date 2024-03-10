import { TestBed, inject } from '@angular/core/testing';

import { StRemoteDataService } from './st-remote-data.service';

describe('StRemoteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StRemoteDataService]
    });
  });

  it('should be created', inject([StRemoteDataService], (service: StRemoteDataService) => {
    expect(service).toBeTruthy();
  }));
});
