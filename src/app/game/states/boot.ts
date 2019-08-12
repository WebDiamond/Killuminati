import * as Phaser from 'phaser-ce'

export default class BootState extends Phaser.State {
  public gd = 'http://localhost:4200';

  preload(game: Phaser.Game): void {
    game.load.shader('menu', this.gd+'/assets/assets/menu.frag');
    game.load.shader('bacteria', this.gd+'/assets/assets/bacteria.frag');
    game.load.audio('buttons', this.gd+'/assets/sounds/button.mp3');
    game.load.audio('hitenemy', this.gd+'/assets/sounds/enemyhit.mp3');
    game.load.audio('bulletload', this.gd+'/assets/sounds/firebullet.mp3');
    game.load.audio('gameover', this.gd+'/assets/sounds/gameoversound.mp3');
    game.load.image('recordbutton', this.gd+'/assets/buttons/recordbtn.png');
    game.load.image('creditbutton', this.gd+'/assets/buttons/creditbtn.png');
    game.load.image('infobutton', this.gd+'/assets/buttons/infobtn.png');
    game.load.image('refreshbutton', this.gd+'/assets/buttons/refresh.png');
    game.load.image('startbutton', this.gd+'/assets/buttons/startbtn.png');
    game.load.image('killuminatiwrite', this.gd+'/assets/backgrounds/killuminatiwr.png');
    game.load.image('gameoverwrite', this.gd+'/assets/backgrounds/gameoverwr.png');
    game.load.image('background', this.gd+'/assets/backgrounds/background.png');
    game.load.image('backgroundsecond', this.gd+'/assets/backgrounds/background2.png');
    game.load.image('backgroundthird', this.gd+'/assets/backgrounds/background3.png');
    game.load.image('backgroundfourth', this.gd+'/assets/backgrounds/background4.png');
    game.load.image('backgroundfifth', this.gd+'/assets/backgrounds/background5.png');
    game.load.image('backgroundsixth', this.gd+'/assets/backgrounds/background6.png');
    game.load.image('backgroundseventh', this.gd+'/assets/backgrounds/background7.png');
    game.load.image('backgroundeight', this.gd+'/assets/backgrounds/background8.png');
    game.load.image('backgroundninth', this.gd+'/assets/backgrounds/background9.png');
    game.load.image('backgroundtenth', this.gd+'/assets/backgrounds/background10.png');
    game.load.image('sfondomenu', this.gd+'/assets/backgrounds/sfondomenu.png');
    game.load.image('cmd', this.gd+'/assets/interface/cmdbar.png');
    game.load.image('atkbutton', this.gd+'/assets/interface/atkbtn.png');
    game.load.image('upbutton', this.gd+'/assets/interface/up.png');
    game.load.image('downbutton', this.gd+'/assets/interface/down.png');
    game.load.image('gem', this.gd+'/assets/interface/ii.png');
    game.load.image('bullet', this.gd+'/assets/interface/bullet.png');
    game.load.image('pointlabel', this.gd+'/assets/interface/pointimg.png');
    game.load.image('timerlabel', this.gd+'/assets/interface/timerimg.png');
    game.load.image('faillabel', this.gd+'/assets/interface/failimg.png');
    game.load.image('scorelabel', this.gd+'/assets/interface/scorecrystal.png');
    game.load.image('explosion', this.gd+'/assets/interface/explosionimg.png');
    game.load.image('bombs', this.gd+'/assets/assets/bomb.png');
    game.load.image('shurikensone', this.gd+'/assets/assets/shuriken1.png');
    game.load.image('shurikenstwo', this.gd+'/assets/assets/shuriken2.png');
    game.load.image('scarabs', this.gd+'/assets/assets/scarab1.png');
    game.load.image('scarabssecond', this.gd+'/assets/assets/scarab2.png');
    game.load.image('scarabsthird', this.gd+'/assets/assets/scarab3.png');
    game.load.image('cadooceadis', this.gd+'/assets/assets/cadooceadis1.png');
    game.load.image('cadooceadissecond', this.gd+'/assets/assets/cadooceadis2.png');
    game.load.image('cadooceadisthird', this.gd+'/assets/assets/cadooceadis3.png');
    game.load.spritesheet('loominadis', this.gd+'/assets/assets/loominadi1.png', 116, 103, 5);
    game.load.spritesheet('loominadissecond', this.gd+'/assets/assets/loominadi2.png', 116, 103, 5);
    game.load.spritesheet('loominadisthird', this.gd+'/assets/assets/loominadi3.png', 116, 103, 5);
    game.load.spritesheet('loominadisfourth', this.gd+'/assets/assets/loominadi4.png', 116, 103, 5);
    game.load.spritesheet('loominadisfifth', this.gd+'/assets/assets/loominadi5.png', 116, 103, 5);
    game.load.spritesheet('loominadissixth', this.gd+'/assets/assets/loominadi6.png', 116, 103, 5);
    game.load.spritesheet('loominadisseventh', this.gd+'/assets/assets/loominadi7.png', 116, 103, 5);
    game.load.spritesheet('loominadiseight', this.gd+'/assets/assets/loominadi8.png', 116, 103, 5);
    game.load.spritesheet('loominadisninth', this.gd+'/assets/assets/loominadi9.png', 116, 103, 5);
    game.load.spritesheet('loominadistenth', this.gd+'/assets/assets/loominadi10.png', 116, 103, 5);
  }

  create(game: Phaser.Game): void {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start("Menu");
  }

}
