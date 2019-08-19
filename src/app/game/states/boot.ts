import * as Phaser from 'phaser-ce'

export default class BootState extends Phaser.State {
  public gd  = 'http://localhost:4200';
  public game: Phaser.Game;

  preload(): void {
    this.game.load.shader('menu', this.gd + '/assets/assets/menu.frag');
    this.game.load.shader('bacteria', this.gd + '/assets/assets/bacteria.frag');
    this.game.load.audio('buttons', this.gd + '/assets/sounds/button.mp3');
    this.game.load.audio('hitenemy', this.gd + '/assets/sounds/enemyhit.mp3');
    this.game.load.audio('bulletload', this.gd + '/assets/sounds/firebullet.mp3');
    this.game.load.audio('gameover', this.gd + '/assets/sounds/gameoversound.mp3');
    this.game.load.image('killuminatiwrite', this.gd + '/assets/backgrounds/killuminatiwr.png');
    this.game.load.image('gameoverwrite', this.gd + '/assets/backgrounds/gameoverwr.png');
    this.game.load.image('background', this.gd + '/assets/backgrounds/background.png');
    this.game.load.image('backgroundsecond', this.gd + '/assets/backgrounds/background2.png');
    this.game.load.image('backgroundthird', this.gd + '/assets/backgrounds/background3.png');
    this.game.load.image('backgroundfourth', this.gd + '/assets/backgrounds/background4.png');
    this.game.load.image('backgroundfifth', this.gd + '/assets/backgrounds/background5.png');
    this.game.load.image('backgroundsixth', this.gd + '/assets/backgrounds/background6.png');
    this.game.load.image('backgroundseventh', this.gd + '/assets/backgrounds/background7.png');
    this.game.load.image('backgroundeight', this.gd + '/assets/backgrounds/background8.png');
    this.game.load.image('backgroundninth', this.gd + '/assets/backgrounds/background9.png');
    this.game.load.image('backgroundtenth', this.gd + '/assets/backgrounds/background10.png');
    this.game.load.image('atkbutton', this.gd + '/assets/interface/atkbtn.png');
    this.game.load.image('upbutton', this.gd + '/assets/interface/up.png');
    this.game.load.image('downbutton', this.gd + '/assets/interface/down.png');
    this.game.load.image('gem', this.gd + '/assets/interface/ii.png');
    this.game.load.image('bullet', this.gd + '/assets/interface/bullet.png');
    this.game.load.image('scorelabel', this.gd + '/assets/interface/scorecrystal.png');
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
    this.game.state.start('Menu');
  }

}
