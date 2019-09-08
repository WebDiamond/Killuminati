import * as Phaser from 'phaser-ce'

export default class GameState extends Phaser.State {
  birdGravity: number
  birdSpeed: number
  birdFlapPower: number
  pipeInterval: number
  pipeHole: number
  score: number
  pipeGroup: Phaser.Group
  bubblePool: Phaser.Group
  urchinPool: Phaser.Group
  num: number
  gameStarted: boolean
  topScore: string | 0
  scoreText: Phaser.Text
  background: Phaser.TileSprite
  floor: Phaser.TileSprite
  gameSound: Phaser.Sound
  hitSound: Phaser.Sound
  popSound: Phaser.Sound
  bubbleSound: Phaser.Sound
  tapText
  bird
  pauseGame
  lowerPipe
  upperPipe
  pipeHolePosition
  bubble
  urchin
  pabutton: Phaser.Image

  init (game) {
    this.birdGravity = 920;
    // horizontal bird speed
    this.birdSpeed = 125;
    // flap thrust
    this.birdFlapPower = 255;
    // milliseconds between the creation of two pipes
    this.pipeInterval = 2500;
    // hole between pipes, in puxels
    this.pipeHole = 120;
    this.score=0;
    this.pipeGroup = this.add.group();

    this.bubblePool = this.add.group();
    this.bubblePool.enableBody = true;

    this.urchinPool = this.add.group();
    this.urchinPool.enableBody = true;
    //this.topScore = 0;
    this.num = 0.28;
    this.gameStarted = false;
    //this.game.paused = false;
  }

  create (game) {
    this.topScore = localStorage.getItem("topFlappyScore") == null ? 0 : localStorage.getItem("topFlappyScore");
    var style = {font: '40px Luckiest Guy, cursive', fill: '#fff', stroke: '#000', strokeThickness: 3};
    this.scoreText = this.add.text(this.game.world.centerX,10,"-", style);


    this.updateScore();
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.tileScale.y = 1;
    this.background.autoScroll(-this.birdSpeed, 0);
    this.game.world.sendToBack(this.background);

    this.floor = this.add.tileSprite(0, this.game.world.height -40, this.game.world.width, 60, 'floor');
    this.game.physics.arcade.enable(this.floor);
    this.floor.body.immovable = true;
    this.floor.autoScroll(-this.birdSpeed, 0);

    this.gameSound = this.add.audio('gamesound');
    this.hitSound = this.add.audio('hitsound');
    this.popSound = this.add.audio('popsound');
    this.bubbleSound = this.add.audio('bubblesound');
    this.gameSound.loopFull();
    //this.stage.backgroundColor = "#87CEEB";
    //this.stage.disableVisibilityChange = true;
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = this.add.sprite(80,240,'fish');
    this.bird.anchor.set(0.5);

    //this.bird.animations.add('flying', [1,2,3,4,5,6], 10, true);
    //this.bird.play('flying');
    this.bird.scale.setTo(this.num, this.num);
    this.game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 0;
    this.game.input.onDown.add(this.flap, this);
    this.game.time.events.loop(this.pipeInterval, this.addPipe, this);
    //this.game.time.events.loop(Phaser.Timer.SECOND * 2.5, this.randomSprite, this);
    //this.addPipe();
    var style = {font: '30px Luckiest Guy, cursive', fill: '#000', stroke: '#fff', strokeThickness: 3};
    this.tapText = this.add.text(this.game.world.centerX-95, this.game.world.centerY, 'Tap to Start', style);


    this.pauseGame = this.add.sprite(this.game.world.width -40, 30, 'pause');
    this.pauseGame.anchor.setTo(0.5);
    this.pauseGame.scale.setTo(0.25, 0.25);
    this.pauseGame.inputEnabled = true;
    this.pauseGame.events.onInputUp.add(function () {
      if(!this.game.paused && this.bird.alive){
        this.game.paused = true;
      }
    }, this);

    this.input.onDown.add(this.unpause, this);
  }

  update (game) {
    this.game.physics.arcade.collide(this.bird, this.pipeGroup, this.die, null, this);
    this.game.physics.arcade.collide(this.bird, this.floor, this.die, null, this);
    this.game.physics.arcade.overlap(this.bird, this.bubblePool, this.grow, null, this);
    this.game.physics.arcade.overlap(this.bird, this.urchinPool, this.shrink, null, this);
    this.game.physics.arcade.overlap(this.bubblePool, this.urchinPool, this.killBubble, null, this);

    if(this.gameStarted){
      this.bird.body.gravity.y = this.birdGravity;
      this.tapText.kill();
    }

    this.bubblePool.forEachAlive(function(element){
      if(element.x < -this.game.width){
        element.kill();
      }
      if(element.x > this.game.width && this.num >=0.35){
        element.kill();
      }
      if(!this.bird.alive){
        element.body.velocity.x = 0;
      }
    }, this);

    this.urchinPool.forEachAlive(function(element){
      if(element.x < -this.game.width){
        element.kill();
      }
      //if(element.x > this.game.width && this.num >=0.3){
      //element.kill();
      //}
      if(!this.bird.alive){
        element.body.velocity.x = 0;
      }
    }, this);

    if (this.bird.angle < 20 && this.gameStarted){
      this.bird.angle += 1;
    }
    if (!this.bird.alive){
      this.game.add.tween(this.bird).to({angle: -190}, 300).start();
    }

    this.pipeGroup.forEachAlive(this.updatePipe, this);

    if(this.bird.y > this.game.height){
      this.die();
      //this.game.state.start('GameState');
    }
  }

  unpause () {
    this.game.paused = false;
  }

  updateScore () {
    this.scoreText.text = ""+this.score;
  }

  updatePipe (pipe) {
    if (pipe.x + pipe.width < this.bird.x && pipe.giveScore) {
      this.score += 0.5;
      this.updateScore();
      pipe.giveScore = false;
    }
    if(!this.bird.alive){
      pipe.body.velocity.x = 0;
      //this.background.stopScroll();
      //this.floor.stopScroll();
    }
  }

  flap () {
    if(this.bird.alive){
      this.gameStarted = true;
      this.bird.body.velocity.y = -this.birdFlapPower;
      this.game.add.tween(this.bird).to({angle: -20}, 100).start();
    }
  }

  addPipe () {
    if(this.bird.alive && this.gameStarted){
      this.pipeHolePosition = Math.floor(Math.random() * 310 + 50);
      this.upperPipe = new FlappyBoard.Pipe(this.game,320,this.pipeHolePosition-495,-this.birdSpeed);
      this.upperPipe.anchor.setTo(0,1);
      this.upperPipe.scale.y = -1;
      this.game.add.existing(this.upperPipe);
      this.pipeGroup.add(this.upperPipe);
      this.lowerPipe = new FlappyBoard.Pipe(this.game,320,this.pipeHolePosition+this.pipeHole,-this.birdSpeed); //?????????????????????????
      this.game.add.existing(this.lowerPipe);
      this.pipeGroup.add(this.lowerPipe);
      this.createBubble();
      this.createUrchin();
    }
  }

  createBubble () {
    var hasBubble;
    if(this.num <0.35){
      hasBubble = Math.random() <= 0.5;
    }
    if(hasBubble){
      this.bubble = this.bubblePool.getFirstExists(false);

      if(!this.bubble){
        this.bubble = new Phaser.Sprite(this.game, 485, this.pipeHolePosition-50, 'bubble');
        this.bubblePool.add(this.bubble);
      }
      else{
        this.bubble.reset(485, this.pipeHolePosition-50);
      }
      this.bubble.body.velocity.x = -this.birdSpeed;
      var tween = this.game.add.tween(this.bubble).to( { y: this.pipeHolePosition+150 }, 1000, "Linear", true, 0, -1);
      tween.yoyo(true, 10);
    }
  }

  createUrchin () {
    var hasUrchin;
    if(this.num > 0.3){
      hasUrchin = Math.random() <= 0.4;
    }
    if(hasUrchin){
      this.urchin = this.urchinPool.getFirstExists(false);

      if(!this.urchin){
        this.urchin = new Phaser.Sprite(this.game, 485, this.pipeHolePosition-100, 'seaurchin1');
        this.urchinPool.add(this.urchin);
      }
      else{
        this.urchin.reset(485, this.pipeHolePosition-100);
      }
      this.urchin.body.velocity.x = -this.birdSpeed;
      this.urchin.scale.setTo(0.25, 0.25);
      var tween = this.game.add.tween(this.urchin).to( { y: this.pipeHolePosition+200 }, 2500, "Linear", true, 0, -1);
      tween.yoyo(true, 10);
    }
  }

  grow (bird, bubble) {
    if(this.num < 0.29){
      //this.popSound.play();
      this.bird.loadTexture('fish2', 0, false);
      bubble.kill();
      this.num = this.num + 0.08;
      this.bird.scale.setTo(this.num,this.num);
      this.bird.body.setSize(240,220, 0, 0);
    }

  }

  shrink (bird, urchin) {
    if(this.num > 0.28){
      urchin.kill();
      this.bird.loadTexture('fish', 0, false);
      this.num = this.num - 0.08;
      this.bird.scale.setTo(this.num,this.num);
      this.bird.body.setSize(220,185, 0, 0);
    }
    else{
      //this.bubbleSound.play();
      this.die();
    }
  }

  killBubble (bubble, urchin) {
    bubble.kill();
  }

  die () {
    if(this.bird.alive){
      this.hitSound.play();
      //this.bubbleSound.play();
      this.background.stopScroll();
      this.floor.stopScroll();
      this.gameSound.stop();
      this.bird.animations.stop(null, true);
      this.bird.alive = false;
      this.birdGravity = 0;
      this.bird.body.velocity.y = -100;
      this.bird.body.velocity.x = 0;
      localStorage.setItem("topFlappyScore",String(Math.max(this.score, Number(this.topScore))));
      var style = {font: '30px Luckiest Guy, cursive', fill: '#000', stroke: '#fff', strokeThickness: 3};
      if (this.score > this.topScore){
        this.add.text(this.game.world.centerX, this.game.world.centerY -140, 'NEW HIGHSCORE', style).anchor.setTo(0.5);
      }
      this.add.text(this.game.world.centerX, this.game.world.centerY -100, 'Game Over', style).anchor.setTo(0.5);
      this.add.text(this.game.world.centerX, this.game.world.centerY -60, 'Your Score: ' + this.score, style).anchor.setTo(0.5);
      this.add.text(this.game.world.centerX, this.game.world.centerY -20, "High Score: " + this.topScore, style).anchor.setTo(0.5);
      this.pabutton = this.game.add.image(this.game.world.centerX, this.game.world.centerY + 50, 'playagainbutton');
      this.pabutton.anchor.setTo(0.5);
      this.pabutton.scale.setTo(0.5, 0.5);
      this.pabutton.inputEnabled = true;
      this.pabutton.events.onInputDown.add(function(){
        this.bubbleSound.stop();
        this.state.restart();
      }, this);
    }
  }
}
