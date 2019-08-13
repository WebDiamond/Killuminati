import {TestBed} from '@angular/core/testing';

import {RankService} from './rank.service';

describe('RankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankService = TestBed.get(RankService);
    expect(service).toBeTruthy();
  });
});
