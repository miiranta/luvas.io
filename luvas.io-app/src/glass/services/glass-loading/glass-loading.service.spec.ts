import { TestBed } from '@angular/core/testing';

import { GlassLoadingService } from './glass-loading.service';

describe('GlassLoadingService', () => {
  let service: GlassLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlassLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
