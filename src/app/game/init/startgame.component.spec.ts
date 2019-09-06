import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartgameComponent} from './startgame.component';

describe('StartgameComponent', () => {
  let component: StartgameComponent;
  let fixture: ComponentFixture<StartgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
