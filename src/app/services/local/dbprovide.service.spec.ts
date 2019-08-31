import {TestBed} from '@angular/core/testing';

import {DbprovideService} from './dbprovide.service';

describe('DbprovideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbprovideService = TestBed.get(DbprovideService);
    expect(service).toBeTruthy();
  });
});
