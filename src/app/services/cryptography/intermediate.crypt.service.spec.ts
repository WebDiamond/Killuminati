import {TestBed} from '@angular/core/testing';
import { Intermediate.CryptService } from './intermediate.crypt.service';

describe('Intermediate.CryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Intermediate.CryptService = TestBed.get(Intermediate.CryptService);
    expect(service).toBeTruthy();
  });
});
