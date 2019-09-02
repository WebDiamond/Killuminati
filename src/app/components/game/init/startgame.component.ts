import {Component, Injectable, OnInit} from '@angular/core';
import * as Phaser from 'phaser-ce';
import MenuState from "../states/menu";
import MainState from "../states/main";
import GameOverState from "../states/gameover";
import {LoadingComponent} from "../../../static/loading/loading.component";
import {ParticlesComponent} from "@src/app/static/particles/particles.component";

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

  ngOnInit() {
    ParticlesComponent.instance.show();
    window.document.getElementById('overlayz').style.display = 'none';
    window.document.getElementById('overlayx').style.display = 'none';
    window.document.getElementById('overlayy').style.display = 'none';
    LoadingComponent.instance.show();
    this.game.state.add('Menu',new MenuState);
    this.game.state.add('Main', new MainState);
    this.game.state.add('GameOver', new GameOverState);
    this.game.state.start('Menu');
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

}
