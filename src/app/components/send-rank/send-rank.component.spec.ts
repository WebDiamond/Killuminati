import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendRankComponent} from './send-rank.component';

describe('SendRankComponent', () => {
  let component: SendRankComponent;
  let fixture: ComponentFixture<SendRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
