import { TestBed, inject } from '@angular/core/testing';

import { SeatsServiceService } from './seats-service.service';

describe('SeatsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatsServiceService]
    });
  });

  it('should be created', inject([SeatsServiceService], (service: SeatsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
