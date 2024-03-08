import { TestBed } from '@angular/core/testing';

import { SignInAuthService } from './sign-in-auth.service';

describe('SignInAuthService', () => {
  let service: SignInAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
