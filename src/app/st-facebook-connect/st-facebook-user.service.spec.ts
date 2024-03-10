import { TestBed, inject } from '@angular/core/testing';

import { StFacebookUserService } from './st-facebook-user.service';

describe('StFacebookUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StFacebookUserService]
    });
  });

  it('should be created', inject([StFacebookUserService], (service: StFacebookUserService) => {
    expect(service).toBeTruthy();
  }));
});
