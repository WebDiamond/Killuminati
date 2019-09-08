import * as Phaser from 'phaser-ce'

export default class HomeState extends Phaser.State {
  delay
  sprite
  speed
  homeScreen
  birdHome
  title
  startGame
  startbutton

  create (game) {

    this.delay = 0;

    for (var i = 0; i < 40; i++)
    {
      this.sprite = game.add.sprite(game.world.randomX, 800, 'bubble');

      this.sprite.scale.set(game.rnd.realInRange(0.1, 0.6));

      this.speed = game.rnd.between(5000, 7000);

      game.add.tween(this.sprite).to({ y: -256 }, this.speed, Phaser.Easing.Sinusoidal.InOut, true, this.delay, 1000, false);

      this.delay += 200;
    }

    this.homeScreen = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    this.homeScreen.tileScale.y = 1;
    game.world.sendToBack(this.homeScreen);
    this.birdHome = game.add.sprite(game.world.centerX -60, game.height/2 - 130, 'fish');
    this.birdHome.scale.setTo(0.5, 0.5);
    var tween = game.add.tween(this.birdHome).to( { y: +200 }, 1000, "Linear", true, 0, -1);
    tween.yoyo(true, 10);


    var style = {font: '40px Luckiest Guy, cursive', fill: '#fff', stroke: '#000', strokeThickness: 3};
    this.title = game.add.text(game.world.centerX -110, game.height/2 - 190, 'FLABBY FISH', style);


    var style = {font: '20px Luckiest Guy, cursive', fill: '#fff', stroke: '#000', strokeThickness: 3};
    this.startGame = game.add.text(game.world.centerX-80, game.world.centerY+20, 'Tap Here to Play', style);
    this.startGame.anchor.setTo = (0.5);
    this.startGame.inputEnabled = false;
    this.startbutton = game.add.image(game.world.centerX, game.world.centerY + 90, 'playagainbutton');
    this.startbutton.anchor.setTo(0.5);
    this.startbutton.scale.setTo(0.5, 0.5);
    this.startbutton.inputEnabled = true;
    this.startbutton.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);
  }
}
