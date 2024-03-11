import { TestBed } from '@angular/core/testing';

import { PepePigBDService } from './pepe-pig-bd.service';

describe('PepePigBDService', () => {
  let service: PepePigBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PepePigBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
