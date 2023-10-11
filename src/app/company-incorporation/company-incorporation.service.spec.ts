import { TestBed } from '@angular/core/testing';

import { CompanyIncorporationService } from './company-incorporation.service';

describe('CompanyIncorporationService', () => {
  let service: CompanyIncorporationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyIncorporationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
