import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public PlayerControlUp() {
    localStorage.setItem('ctrl_up', '1')
  }

  public PlayerControlDown() {
    localStorage.setItem('ctrl_dwn', '1')
  }

  public PlayerControlFire() {
    localStorage.setItem('ctrl_fire', '1')
  }

  public getCurrentTime() {
    return localStorage.getItem('total');
  }
  public getRequiredPoint() {
    return localStorage.getItem('required');
  }
  public getTimeLimit() {
    return localStorage.getItem('elapsedtime');
  }
  public getScore() {
    return localStorage.getItem('score');
  }
}
