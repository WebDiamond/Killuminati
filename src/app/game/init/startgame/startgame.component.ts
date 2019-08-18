import {Component, Injectable, OnInit} from '@angular/core';
import * as Phaser from 'phaser-ce';
import BootState from "../../states/boot";
import MenuState from "../../states/menu";
import MainState from "../../states/main";
import GameOverState from "../../states/gameover";
import {LoadingComponent} from "../../../static/loading/loading.component";

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
  constructor() { }

  ngOnInit() {
    LoadingComponent.instance.show();
    this.game.state.add('Boot', new BootState);
    this.game.state.add('Menu',new MenuState);
    this.game.state.add('Main', new MainState);
    this.game.state.add('GameOver', new GameOverState);
    this.game.state.start('Boot');
  }
  public getCurrentTime(i: number): void {
    console.log(i);
  }

  public getCurrentPoint(i: number): void {
    console.log(i);
  }

  public getRequiredTime(i: number): void {
    console.log(i);
  }

  public getCurrentScore(i: number): void {
    console.log(i);
  }

  public getGameOverScore(i: number): void {
    console.log(i);
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

  public showOverlayY() {
    window.document.getElementById('overlayx').style.display='block';
  }

  public showOverlayZ() {
    window.document.getElementById('overlayy').style.display='block';
  }

}
