import {TestBed} from '@angular/core/testing';
import {IntermediateCryptService} from './intermediate.crypt.service';

describe('Intermediate.CryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntermediateCryptService = TestBed.get(IntermediateCryptService);
    expect(service).toBeTruthy();
  });
});
