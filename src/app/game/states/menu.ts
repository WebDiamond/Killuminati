import * as Phaser from 'phaser-ce'
import {LoadingComponent} from "../../static/loading/loading.component";

export default class MenuState extends Phaser.State {
  public buttonmenusound;
  public filtermenu;
  public startbutton;
  public recordbutton;
  public endbutton;
  public infobutton;
  public game: Phaser.Game;
  create(): void {
    this.buttonmenusound = this.game.add.audio('buttons');
    this.filtermenu = new Phaser.Filter(this.game, null, this.game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    this.game.add.sprite(50, 160, 'killuminatiwrite');
    this.startbutton = this.game.add.sprite(50, 250, 'startbutton');
    this.startbutton.inputEnabled = true;
    this.recordbutton = this.game.add.sprite(50, 330, 'recordbutton');
    this.recordbutton.inputEnabled = true;
    this.endbutton = this.game.add.sprite(50, 410, 'creditbutton');
    this.endbutton.inputEnabled = true;
    this.infobutton = this.game.add.sprite(50, 490, 'infobutton');
    this.infobutton.inputEnabled = true;
    LoadingComponent.instance.hide();
  }

  update(): void {
    this.filtermenu.update();
    this.startbutton.events.onInputDown.add(this.onDownFirst, this);
    this.recordbutton.events.onInputDown.add(this.onDownRecord, this);
    this.endbutton.events.onInputDown.add(this.onDownEnd, this);
    this.infobutton.events.onInputDown.add(this.onDownInfo, this);
  }

  onDownFirst(): void {
    this.buttonmenusound.play();
    this.game.state.start('Main');
  }
  onDownRecord(): void {
    this.buttonmenusound.play();
    window.document.getElementById('overlayz').style.display = 'block';
  }
  onDownEnd(): void {
    this.buttonmenusound.play();
    window.document.getElementById('overlayy').style.display = 'block';
  }
  onDownInfo(): void {
    this.buttonmenusound.play();
    window.document.getElementById('overlayx').style.display = 'block';
  }
}
