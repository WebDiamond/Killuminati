import * as Phaser from 'phaser-ce'
import {LoadingComponent} from "../../static/loading/loading.component";

export default class MenuState extends Phaser.State {
  public buttonmenusound;
  public filtermenu;
  public game: Phaser.Game;
  create(): void {
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('joypad').style.display='none';
    window.document.getElementById('menubuttons').style.display='block';
    this.buttonmenusound = this.game.add.audio('buttons');
    this.filtermenu = new Phaser.Filter(this.game, null, this.game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    this.game.add.sprite(50, 160, 'killuminatiwrite');
    LoadingComponent.instance.hide();
  }
  update(): void {
    this.filtermenu.update();
  }
}
