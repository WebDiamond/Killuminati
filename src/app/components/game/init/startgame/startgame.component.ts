import {Component, Injectable, OnInit} from '@angular/core';
import * as Phaser from 'phaser-ce';
import MenuState from "../../states/menu";
import MainState from "../../states/main";
import GameOverState from "../../states/gameover";
import {LoadingComponent} from "../../../../static/loading/loading.component";


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
  public adsComponent: HTMLIFrameElement;

  constructor() { }

  ngOnInit() {
    LoadingComponent.instance.show();
    this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    window.document.getElementById('ady').appendChild(this.adsComponent);
    this.game.state.add('Menu',new MenuState);
    this.game.state.add('Main', new MainState);
    this.game.state.add('GameOver', new GameOverState);
    this.game.state.start('Menu');
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
  public getLast() {
    return localStorage.getItem('last');
  }
  public startGame(){
    this.game.state.start('Main');
  }

  public loadGameOver(){
    window.document.getElementById('returnbutton').style.display='none';
    LoadingComponent.instance.show();
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

  public PlayerControlUp() {
    localStorage.setItem('ctrl_up', '1')
  }

  public PlayerControlDown() {
    localStorage.setItem('ctrl_dwn', '1')
  }

  public PlayerControlFire() {
    localStorage.setItem('ctrl_fire', '1')
  }
}