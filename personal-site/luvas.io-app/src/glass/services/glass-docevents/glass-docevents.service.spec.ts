import { TestBed } from '@angular/core/testing';

import { GlassDoceventsService } from './glass-docevents.service';

describe('GlassDoceventsService', () => {
  let service: GlassDoceventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlassDoceventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
