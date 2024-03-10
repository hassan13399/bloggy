import { TestBed, inject } from '@angular/core/testing';

import { StFormService } from './st-form.service';

describe('StFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StFormService]
    });
  });

  it('should be created', inject([StFormService], (service: StFormService) => {
    expect(service).toBeTruthy();
  }));
});
