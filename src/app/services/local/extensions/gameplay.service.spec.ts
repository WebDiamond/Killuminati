import {TestBed} from '@angular/core/testing';
import {GameplayService} from './gameplay.service';

describe('GameplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: GameplayService = TestBed.get(GameplayService);
    expect(service).toBeTruthy();
  });
});
