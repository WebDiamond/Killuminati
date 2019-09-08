import * as Phaser from 'phaser-ce'

export default class BootState extends Phaser.State {
  init(game) {
    game.stage.backgroundColor = '#fff'
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true

    game.physics.startSystem(Phaser.Physics.ARCADE)
  }

  preload(game) {
    this.load.image('preloadbar', 'assets/images/bar.png')
    this.load.image('logo', 'assets/images/logo.png')
  }

  create (game) {
    this.state.start('PreloadState');
  }
}
