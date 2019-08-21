import {Component, Injectable, OnInit} from '@angular/core';
import * as Phaser from 'phaser-ce';
import BootState from "../../states/boot";
import MenuState from "../../states/menu";
import MainState from "../../states/main";
import GameOverState from "../../states/gameover";
import {LoadingComponent} from "../../../static/loading/loading.component";
import * as nipplejs from "nipplejs";
import {JoystickManagerOptions} from "nipplejs";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-startgame',
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.css']
})
export class StartgameComponent implements OnInit {
  public gameWidth: number = window.innerWidth * window.devicePixelRatio;
  public gameHeight: number = (window.innerHeight * window.devicePixelRatio) - 45 * window.devicePixelRatio;
  public game: Phaser.Game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.WEBGL, 'gameArea');
  public options: JoystickManagerOptions  = {
    color: 'red',
    position: {left: '15%', bottom: '10%'},
    mode: 'static',
    size: 100,
    lockX: true,
  };
  constructor() { }

  ngOnInit() {
    this.options.zone = window.document.getElementById('joypad');
    nipplejs.create(this.options);
    LoadingComponent.instance.show();
    this.game.state.add('Boot', new BootState);
    this.game.state.add('Menu',new MenuState);
    this.game.state.add('Main', new MainState);
    this.game.state.add('GameOver', new GameOverState);
    this.game.state.start('Boot');
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

  public startGame(){
    this.game.state.start('Main');
  }

  public loadGameOver(){
    window.document.getElementById('returnbutton').style.display='none';
    this.game.state.start('Menu');
  }

  public showOverlayX() : void {
    window.document.getElementById('overlayz').style.display='block';
  }

  public showOverlayY(): void {
    window.document.getElementById('overlayx').style.display='block';
  }

  public showOverlayZ(): void {
    window.document.getElementById('overlayy').style.display='block';
  }

  public PlayerControlDown() {
    localStorage.setItem('ctrl_dwn', '1')
  }

  public PlayerControlUp() {
    localStorage.setItem('ctrl_up', '1')
  }

  public PlayerControlFire() {
    localStorage.setItem('ctrl_fire', '1')
  }
}
