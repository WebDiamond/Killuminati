import * as Phaser from 'phaser-ce'
import {ParticlesComponent} from "@src/app/static/particles/particles.component";

export default class Runner extends Phaser.State{
  public game: Phaser.Game;
  private tileWidth: number;
  private tileHeight: number;
  private platforms: Phaser.Group;
  private spacing: number = 300;
  private player: Phaser.Sprite;
  private scoreLabel: Phaser.Text;
  private score: number;
  private cursors: Phaser.CursorKeys;

  public preload(): void{
    this.load.image("platform", "/assets/assets/tile.png");
    this.load.image("player", "/assets/assets/player.png");
  }
  public create(): void{
    this.score = 0;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    ParticlesComponent.instance.hide();
    window.document.getElementById('menubuttons').style.display='none';
    this.tileWidth = this.game.cache.getImage('platform').width;
    this.tileHeight = this.game.cache.getImage('platform').height;
    this.game.stage.backgroundColor='479cde';
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.platforms.createMultiple(250,'platform');
    this.game.time.events.loop(2000,this.addPlatform,this);
    this.createScore();
    this.createPlayer();
    this.initPlatforms();
  }

  public update(): void {
    if(this.cursors.up.isDown && this.player.body.wasTouching.down) {
      this.player.body.velocity.y = -1400;
    }
    if(this.cursors.left.isDown){
      this.player.body.velocity.x += -30;
    }
    if(this.cursors.right.isDown){
      this.player.body.velocity.x += 30;
    }
    this.game.physics.arcade.collide(this.player, this.platforms);
    if(this.player.body.position.y >= this.game.world.height - this.player.body.height){
      this.game.state.start("GameOver");
    }
  }
  public createScore(): void{
    let scoreFont = "100px Arial";
    this.scoreLabel = this.game.add.text((this.game.world.centerX), 100, "0", {
      font: scoreFont, fill: "#fff"
    });
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.align = 'center';
  }

  public incrementScore(): void{
    this.score += 1;
    this.scoreLabel.text = String(this.score);
  }
  public addTile(x:number,y:number): void {
    let tile = this.platforms.getFirstDead();
    tile.reset(x,y);
    tile.body.velocity.y = 150;
    tile.body.immovable = true;
    tile.checkWorldBounds = true;
    tile.outOfBoundsKill = true;
  }
  public addPlatform(y:number): void{
    if (typeof(y) === "undefined"){
      y = -this.tileHeight;
      this.incrementScore();
    }
    let tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
    let hole = Math.floor(Math.random() *(tilesNeeded - 3) + 1);
    for (var i=0; i< tilesNeeded; i++){
      if (i != hole && i != hole +1 ){
        this.addTile(i * this.tileWidth, y);
      }
    }
  }
  public initPlatforms(): void {
      let bottom = this.game.world.height - this.tileHeight,
      top = this.tileHeight;

    //Keep creating platforms until they reach (near) the top of the screen
    for(let y = bottom; y > top - this.tileHeight; y = y - this.spacing){
      this.addPlatform(y);
    }
  }
  public createPlayer(): void{
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - (this.spacing * 2 + (3 * this.tileHeight)), 'player');
    this.player.anchor.setTo(0.5, 1.0);
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 2000;
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.1;
  }
};
