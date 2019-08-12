import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {LoadingComponent} from "./static/loader/loader.component";
import * as Phaser from 'phaser-ce'
import BootState from "./game/states/boot";
import MenuState from "./game/states/menu";
import GameOverState from "./game/states/gameover";
import MainState from "./game/states/main";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'killuminatipwa';
  public gameWidth: number = window.innerWidth * window.devicePixelRatio;
  public gameHeight: number = (window.innerHeight * window.devicePixelRatio) - 45 * window.devicePixelRatio;
  public game: Phaser.Game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.WEBGL, 'gameArea');
// <- ed ecco qui che viene inizializzato il game
//  public gameScripts = ["boot.js","gameover.js","main.js","menu.js"];
//  private gameScriptComponent: HTMLScriptElement;
  private adsComponent: HTMLIFrameElement;
  constructor(private http: HttpClient){
  }
  ngOnInit() {
    /*
    for(let i = 0; i < this.gameScripts.length; i++) {
      this.http.get('assets/js/' + this.gameScripts[i], {responseType: 'text'}).subscribe(data => {
        this.gameScriptComponent = window.document.createElement("script");
        this.gameScriptComponent.innerHTML = data;
        window.document.getElementById('game').appendChild(this.gameScriptComponent);
      })
    }*/
    //LoadingComponent.instance.show();
    window['Phaser'] = Phaser;
    this.game.state.add('Boot', new BootState);
    this.game.state.add('Menu',new MenuState);
    this.game.state.add('Main', new MainState);
    this.game.state.add('GameOver', new GameOverState);
    this.game.state.start('Boot');
    //LoadingComponent.instance.hide();
    this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    this.adsComponent.style.border = "0px";
    this.adsComponent.style.padding = "0";
    this.adsComponent.style.overflow = "hidden";
    window.document.getElementById('ad').appendChild(this.adsComponent);
  }

  getScore(){
    return localStorage.getItem('score');
  }

  toHome() {
    window.document.getElementById("overlay").style.display = "none";
  }
}
