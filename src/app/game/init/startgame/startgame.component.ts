import {Component, OnInit} from '@angular/core';
import * as Phaser from 'phaser-ce';
import BootState from "../../states/boot";
import MenuState from "../../states/menu";
import MainState from "../../states/main";
import GameOverState from "../../states/gameover";
import {LoadingComponent} from "../../../static/loading/loading.component";

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

}
