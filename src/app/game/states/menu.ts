import * as Phaser from 'phaser-ce'
import {LoadingComponent} from "../../static/loading/loading.component";

export default class MenuState extends Phaser.State {
  public buttonmenusound;
  public gd  = 'http://192.168.1.5:8080';
  public game: Phaser.Game;
  public filter: any;

  preload(): void {
    this.game.load.shader('rainbow', this.gd + '/assets/assets/rainbow.frag');
    this.game.load.shader('fractal', this.gd + '/assets/assets/fractal.frag');
    this.game.load.shader('godly', this.gd + '/assets/assets/godly.frag');
    this.game.load.shader('bluefire', this.gd + '/assets/assets/bluefire.frag');
    this.game.load.shader('bacteria', this.gd + '/assets/assets/bacteria.frag');
    this.game.load.audio('buttons', this.gd + '/assets/sounds/button.mp3');
    this.game.load.audio('hitenemy', this.gd + '/assets/sounds/enemyhit.mp3');
    this.game.load.audio('bulletload', this.gd + '/assets/sounds/firebullet.mp3');
    this.game.load.audio('gameover', this.gd + '/assets/sounds/gameoversound.mp3');
    this.game.load.image('gem', this.gd + '/assets/interface/ii.png');
    this.game.load.image('bullet', this.gd + '/assets/interface/bullet.png');
    this.game.load.image('explosion', this.gd + '/assets/interface/explosionimg.png');
    this.game.load.image('bombs', this.gd + '/assets/assets/bomb.png');
    this.game.load.image('shurikensone', this.gd + '/assets/assets/shuriken1.png');
    this.game.load.image('shurikenstwo', this.gd + '/assets/assets/shuriken2.png');
    this.game.load.image('scarabs', this.gd + '/assets/assets/scarab1.png');
    this.game.load.image('scarabssecond', this.gd + '/assets/assets/scarab2.png');
    this.game.load.image('scarabsthird', this.gd + '/assets/assets/scarab3.png');
    this.game.load.image('cadooceadis', this.gd + '/assets/assets/cadooceadis1.png');
    this.game.load.image('cadooceadissecond', this.gd + '/assets/assets/cadooceadis2.png');
    this.game.load.image('cadooceadisthird', this.gd + '/assets/assets/cadooceadis3.png');
    this.game.load.spritesheet('loominadis', this.gd + '/assets/assets/loominadi1.png', 116, 103, 5);
    this.game.load.spritesheet('loominadissecond', this.gd + '/assets/assets/loominadi2.png', 116, 103, 5);
    this.game.load.spritesheet('loominadisthird', this.gd + '/assets/assets/loominadi3.png', 116, 103, 5);
    this.game.load.spritesheet('loominadisfourth', this.gd + '/assets/assets/loominadi4.png', 116, 103, 5);
    this.game.load.spritesheet('loominadisfifth', this.gd + '/assets/assets/loominadi5.png', 116, 103, 5);
    this.game.load.spritesheet('loominadissixth', this.gd + '/assets/assets/loominadi6.png', 116, 103, 5);
    this.game.load.spritesheet('loominadisseventh', this.gd + '/assets/assets/loominadi7.png', 116, 103, 5);
    this.game.load.spritesheet('loominadiseight', this.gd + '/assets/assets/loominadi8.png', 116, 103, 5);
    this.game.load.spritesheet('loominadisninth', this.gd + '/assets/assets/loominadi9.png', 116, 103, 5);
    this.game.load.spritesheet('loominadistenth', this.gd + '/assets/assets/loominadi10.png', 116, 103, 5);
  }
  create(): void {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('firebutton').style.display='none';
    window.document.getElementById('menubuttons').style.display='block';
    this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
    this.filter.addToWorld(-1, -1,3000,3000);
    this.buttonmenusound = this.game.add.audio('buttons');
    LoadingComponent.instance.hide();
  }
  update(): void {
    this.filter.update();
  }
}
