import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-gamepad',
  templateUrl: './gamepad.component.html',
  styleUrls: ['./gamepad.component.css']
})
export class GamepadComponent implements OnInit {

  public static instance;
  public ctrlUp: number;
  public ctrlDown: number;
  public ctrlFire: number;
  public required: number = 0;
  public elapsedTime: number = 0;
  public total: number = 0;
  public score: number = 0;
  constructor() {
    GamepadComponent.instance = this;
  }

  ngOnInit() {
  }

  public getCurrentTime() {
    return this.total
  }
  public getRequiredPoint() {
    return this.required
  }
  public getTimeLimit() {
    return this.elapsedTime
  }
  public getScore() {
    return this.score
  }
  public setRequire(num: number){
    this.required = num;
  }
  public setElapsedtime(num: number){
    this.elapsedTime = num;
  }
  public setScore(num: number){
    this.score = num;
  }
  public setTotal(num: number){
    this.total = num;
  }
  public PlayerControlUpx() {
    this.ctrlUp = 1;
  }
  public PlayerControlDownx() {
    this.ctrlDown = 1;
  }
  public PlayerControlFirex() {
    this.ctrlFire = 1;
  }
  public PlayerControlUp() {
    this.ctrlUp = 0;
  }
  public PlayerControlDown() {
    this.ctrlDown = 0;
  }
  public PlayerControlFire() {
    this.ctrlFire = 0;
  }
  public show(): void{
    window.document.getElementById('firebutton').style.display='block';
    window.document.getElementById('navbarjoypad').style.display='block';
    window.document.getElementById('gamepanel').style.display='block';
  }
  public hide(): void{
    window.document.getElementById('firebutton').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('gamepanel').style.display='none';
  }
}
