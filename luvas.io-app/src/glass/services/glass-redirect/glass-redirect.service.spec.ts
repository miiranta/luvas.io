import { TestBed } from '@angular/core/testing';

import { GlassRedirectService } from './glass-redirect.service';

describe('GlassRedirectService', () => {
  let service: GlassRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlassRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
