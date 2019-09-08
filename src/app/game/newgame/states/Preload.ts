export default class PreloadState extends Phaser.State {
  preloadBar
  logo

  preload (game) {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    //load game assets
    this.game.load.image('bird', 'assets/images/bird.png');
    this.game.load.image('fish', 'assets/images/BlowFish.png');
    this.game.load.image('fish2', 'assets/images/BlowFish2.png');
    this.game.load.image('fish3', 'assets/images/BlowFish3.png');
    this.game.load.image('pipe', 'assets/images/pipe.png');
    this.game.load.image('coin', 'assets/images/coinGold.png');
    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('floor', 'assets/images/floor.png');
    this.game.load.image('playagaintext', 'assets/images/playagain.png');
    this.game.load.image('playagainbutton', 'assets/images/pabutton.png');
    this.game.load.image('bubble', 'assets/images/bubble.png');
    this.game.load.image('seaurchin', 'assets/images/sea-urchin.png');
    this.game.load.image('seaurchin1', 'assets/images/urchin.png');
    this.game.load.image('pause', 'assets/images/pause.png');
    this.load.spritesheet('birdy', 'assets/images/birdy.png', 208,168,8,0,0);
    this.load.audio('gamesound', ['assets/audio/water-world.mp3', 'assets/audio/water-world.ogg']);
    this.load.audio('hitsound', ['assets/audio/Hit_01.mp3', 'assets/audio/Hit_01.ogg']);
    this.load.audio('popsound', ['assets/audio/pop.mp3', 'assets/audio/pop.ogg']);
    this.load.audio('bubblesound', ['assets/audio/bubbles.mp3', 'assets/audio/bubbles.ogg']);
  }
  create () {
    this.state.start('HomeState');
  }
}
