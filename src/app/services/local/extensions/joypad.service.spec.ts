import {TestBed} from '@angular/core/testing';
import {JoypadService} from './joypad.service';

describe('JoypadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: JoypadService = TestBed.get(JoypadService);
    expect(service).toBeTruthy();
  });
});
