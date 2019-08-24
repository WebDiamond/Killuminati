import {TestBed} from '@angular/core/testing';
import {BestscoreService} from './bestscore.service';

describe('BestscoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BestscoreService = TestBed.get(BestscoreService);
    expect(service).toBeTruthy();
  });
});
