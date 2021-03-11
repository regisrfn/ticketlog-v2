import { TestBed } from '@angular/core/testing';

import { ValidateCidadeService } from './validate-cidade.service';

describe('ValidateCidadeService', () => {
  let service: ValidateCidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
