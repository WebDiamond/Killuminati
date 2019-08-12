import * as Phaser from 'phaser-ce'

export default class MainState extends Phaser.State {
  public bulletTime: number;
  public total: number;
  public score: number = 0;
  public filter: any;
  public gameoversound: any;
  public firebulletsound: any;
  public hitenemysound: any;
  public required: number;
  public elapsedTime: number;
  public timer: any;
  public gem: any;
  public bullets: any;
  public cmd: any;
  public buttonone: any;
  public buttonup: any;
  public buttondown: any;
  public requiredico: any;
  public timerico: any;
  public failico: any;
  public scoreico: any;
  public shurikensone: any;
  public shurikenstwo: any;
  public cadooceadis: any;
  public scarabs: any;
  public loominadis: any;
  public bombs: any;
  public x: any;

  create(): void {
    this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('bacteria'));
    this.CheckStorage();
    this.gameoversound = this.game.add.audio('gameover');
    this.firebulletsound = this.game.add.audio('bulletload');
    this.hitenemysound = this.game.add.audio('hitenemy');
    this.required = 10 + Math.round(5*Math.random());
    this.elapsedTime = 10 + Math.round(5*Math.random());
    this.game.world.setBounds(-1,-1, 3500,3500);
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.updateTime, this);
    this.timer.start();
    this.generateLevel(0);
    this.gem = this.game.add.sprite(120, 250, 'gem');
    this.game.physics.enable(this.gem, Phaser.Physics.ARCADE);
    this.gem.fixedToCamera = true;
    this.generateEnemyGroup(Math.round(9*Math.random()));
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < 5; i++){
      let b = this.bullets.create(0, 0, 'bullet');
      b.name = 'bullet' + i;
      b.exists = false;
      b.visible = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add(this.resetBullet, this);
    }
    this.cmd = this.game.add.sprite(0, 480, 'cmd');
    this.cmd.fixedToCamera = true;
    this.buttonone = this.game.add.button(250, 480, 'atkbutton', this.actionOnClickAtk, this, 2, 1, 0);
    this.buttonone.fixedToCamera = true;
    this.buttonup = this.game.add.button(50, 480, 'upbutton', this.actionOnClickUp, this, 2, 1, 0);
    this.buttonup.fixedToCamera = true;
    this.buttondown = this.game.add.button(150, 480, 'downbutton', this.actionOnClickDown, this, 2, 1, 0);
    this.buttondown.fixedToCamera = true;
    this.requiredico = this.game.add.sprite(15, 10, 'pointlabel');
    this.requiredico.fixedToCamera = true;
    this.timerico = this.game.add.sprite(100, 10, 'timerlabel');
    this.timerico.fixedToCamera = true;
    this.failico = this.game.add.sprite(100, 64, 'faillabel');
    this.failico.fixedToCamera = true;
    this.scoreico = this.game.add.sprite(15, 64, 'scorelabel');
    this.scoreico.fixedToCamera = true;
  }

  update(): void {
    this.filter.update();
    this.game.camera.x += 2;
    this.game.camera.y += 1.5;
    this.game.world.wrap(this.gem, 0, true);
    this.shurikensone.angle += 0.3;
    this.shurikenstwo.angle += 0.3;
    this.game.physics.arcade.overlap(this.bullets, this.loominadis, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.cadooceadis, this.GlobalCollisionHandlerSecond, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.scarabs, this.GlobalCollisionHandlerThird, null, this);
    this.game.physics.arcade.overlap(this.gem, this.bombs, this.AnotherCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.gem, this.shurikensone, this.AnotherCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.gem, this.shurikenstwo, this.AnotherCollisionHandler, null, this);
    if (this.elapsedTime === this.total){
      this.timer.stop();
      this.total = 0;
      if (this.score > Number(localStorage.getItem('highscore'))){
        localStorage.setItem('highscore', String(this.score));
        localStorage.setItem('last', String(this.score));
        this.score = 0;
      }
      else if (this.score <= Number(localStorage.getItem('highscore'))) {
        localStorage.setItem("last", String(this.score));
        this.score = 0;
      }
      this.gameoversound.play();
      this.game.state.start("GameOver");
    }
    if (this.required <= 0){
      this.total = 0;
      this.score++
      this.game.state.start('Main');
    }
  }

  render(): void {
    this.game.debug.text('     '+this.required, 20, 32);
    this.game.debug.text('     '+this.total, 120, 32);
    this.game.debug.text('     '+this.elapsedTime, 120, 86);
    this.game.debug.text('     '+this.score, 20, 86);
  }

  generateLevel(gnum) {
    if (gnum === 0){
      this.filter.addToWorld(-1, -1, 3000, 3000);
      //game.add.sprite(-1, -1, 'background');
    }
    else if (gnum === 1){
      this.game.add.sprite(-1, -1, 'backgroundsecond');
    }
    else if (gnum === 2){
      this.game.add.sprite(-1, -1, 'backgroundthird');
    }
    else if (gnum === 3){
      this.game.add.sprite(-1, -1, 'backgroundfourth');
    }
    else if (gnum === 4){
      this.game.add.sprite(-1, -1, 'backgroundfifth');
    }
    else if (gnum === 5){
      this.game.add.sprite(-1, -1, 'backgroundsixth');
    }
    else if (gnum === 6){
      this.game.add.sprite(-1, -1, 'backgroundseventh');
    }
    else if (gnum === 7){
      this.game.add.sprite(-1, -1, 'backgroundeight');
    }
    else if (gnum === 8){
      this.game.add.sprite(-1, -1, 'backgroundninth');
    }
    else if (gnum === 9){
      this.game.add.sprite(-1, -1, 'backgroundtenth');
    }
  }

  generateCustomGroupEnemy(name, numlimit, kind){
    if (kind === 'cadooceadi'){
      this.cadooceadis = this.game.add.group();
      this.cadooceadis.enableBody = true;
      this.cadooceadis.physicsBodyType = Phaser.Physics.ARCADE;
    }
    else if (kind === 'scarab'){
      this.scarabs = this.game.add.group();
      this.scarabs.enableBody = true;
      this.scarabs.physicsBodyType = Phaser.Physics.ARCADE;
    }
    else if(kind === 'loominadi'){
      this.loominadis = this.game.add.group();
      this.loominadis.physicsBodyType = Phaser.Physics.ARCADE;
      this.loominadis.enableBody = true;
    }
    for (let i = 0; i < numlimit; i++){
      if (kind === 'cadooceadi'){
        this.x = this.cadooceadis.create(this.game.world.randomX, Math.random() * 2000, name);
        this.x.name = kind + i;
      }
      else if (kind === 'scarab'){
        this.x = this.scarabs.create(this.game.world.randomX, Math.random() * 2000, name);
        this.x.name = kind + i;
      }
      else if(kind === 'loominadi'){
        this.x = this.loominadis.create(this.game.world.randomX, Math.random() * 2000, name);
        this.x.name = kind + i;
      }
      if ((this.x.body.x < this.gem.body.x) && ((this.x.body.y > this.gem.body.y)
        ||(this.x.body.y < this.gem.body.y)))
        this.x.kill();
      this.x.body.velocity.x = 30 + Math.random() * Math.random() + i * Math.random();
      this.x.body.velocity.y = 30 + Math.random() * Math.random() + i * Math.random();
      if(kind === 'loominadi'){
        this.x.animations.add('eyemove');
        this.x.animations.play('eyemove', 10, true);
      }
    }
  }
  generateCustomGroupEnemyElements(numlimit){
    this.bombs = this.game.add.group();
    this.shurikensone = this.game.add.group();
    this.shurikenstwo = this.game.add.group();
    this.bombs.enableBody = true;
    this.shurikensone.enableBody = true;
    this.shurikenstwo.enableBody = true;
    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    this.shurikensone.physicsBodyType = Phaser.Physics.ARCADE;
    this.shurikenstwo.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < numlimit; i++){
      let x = this.bombs.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'bombs');
      if ((x.body.x < this.gem.body.x && x.body.y > this.gem.body.y)
        || (x.body.x <= ( this.gem.body.x || 200 + this.gem.body.x) && x.body.y <= this.gem.body.y ))
        x.kill();
      let y = this.shurikenstwo.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'shurikenstwo');
      if ((y.body.x < this.gem.body.x && y.body.y > this.gem.body.y)
        || (y.body.x <= this.gem.body.x && y.body.y <= this.gem.body.y )
        || (y.body.x < 250 + this.gem.body.x && y.body.y === this.gem.body.y )
        || (y.body.x === this.gem.body.x && y.body.y < 200 + this.gem.body.y ))
        y.kill();
      y.anchor.setTo(0.5, 0.5);
      y.body.velocity.y = 50 + Math.random();
      var z = this.shurikensone.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'shurikensone');
      if ((z.body.x < this.gem.body.x && z.body.y > this.gem.body.y)
        ||(z.body.x <= this.gem.body.x && z.body.y <= this.gem.body.y)
        ||(z.body.x < 250 + this.gem.body.x && z.body.y === this.gem.body.y)
        ||(z.body.x === this.gem.body.x && z.body.y < 200 + this.gem.body.y))
        z.kill();
      z.anchor.setTo(0.5, 0.5);
      z.body.velocity.y = 50 + Math.random();
    }
  }
  generateEnemyGroup(anum) {
    this.generateCustomGroupEnemyElements(23);
    if (anum === 0){
      this.generateCustomGroupEnemy('loominadis','250','loominadi');
      this.generateCustomGroupEnemy('scarabs','5','scarab');
      this.generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
    }
    else if (anum === 1){
      this.generateCustomGroupEnemy('loominadissecond','250','loominadi');
      this.generateCustomGroupEnemy('scarabssecond','5','scarab');
      this.generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
    }
    else if (anum === 2){
      this.generateCustomGroupEnemy('loominadisthird','250','loominadi');
      this.generateCustomGroupEnemy('scarabsthird','5','scarab');
      this.generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
    }
    else if (anum === 3){
      this.generateCustomGroupEnemy('loominadissecond','250','loominadi');
      this.generateCustomGroupEnemy('scarabs','5','scarab');
      this.generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
    }
    else if (anum === 4){
      this.generateCustomGroupEnemy('loominadisfifth','250','loominadi');
      this.generateCustomGroupEnemy('scarabssecond','5','scarab');
      this.generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
    }
    else if (anum === 5){
      this.generateCustomGroupEnemy('loominadissixth','250','loominadi');
      this.generateCustomGroupEnemy('scarabsthird','5','scarab');
      this.generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
    }
    else if (anum === 6) {
      this.generateCustomGroupEnemy('loominadisseventh','250','loominadi');
      this.generateCustomGroupEnemy('scarabs','5','scarab');
      this.generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
    }
    else if (anum === 7){
      this.generateCustomGroupEnemy('loominadiseight','250','loominadi');
      this.generateCustomGroupEnemy('scarabssecond','5','scarab');
      this.generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
    }
    else if (anum === 8){
      this.generateCustomGroupEnemy('loominadisninth','250','loominadi');
      this.generateCustomGroupEnemy('scarabsthird','5','scarab');
      this.generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
    }
    else if (anum === 9){
      this.generateCustomGroupEnemy('loominadistenth','250','loominadi');
      this.generateCustomGroupEnemy('scarabs','5','scarab');
      this.generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
    }
  }
  updateTime(){
    this.total++
  }
  resetBullet(bullet) {
    bullet.kill();
  }
  GlobalCollisionHandler(bullet, loominadi){
    this.game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
    bullet.kill();
    loominadi.kill();
    this.required--
    this.hitenemysound.play();
  }
  GlobalCollisionHandlerSecond(bullet, cadooceadi){
    this.game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
    bullet.kill();
    cadooceadi.kill();
    this.required -= 3;
    this.hitenemysound.play();
  }
  GlobalCollisionHandlerThird(bullet, scarab){
    this.game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
    bullet.kill();
    scarab.kill();
    this.total -= 5;
    this.hitenemysound.play();
  }
  AnotherCollisionHandler(gem, bomb){
    this.game.add.sprite(bomb.body.x, bomb.body.y,'explosion');
    bomb.kill();
    this.elapsedTime = this.total;
    this.hitenemysound.play();
  }
  fireBullet() {
    this.firebulletsound.play();
    if (this.game.time.now > this.bulletTime){
      let bullet = this.bullets.getFirstExists(false);
      if (bullet){
        bullet.reset(this.gem.x, this.gem.y);
        bullet.body.velocity.x = 1000;
        this.bulletTime = this.game.time.now + 0.5;
      }
    }
  }

  actionOnClickAtk(): void {
    this.fireBullet();
  };
  actionOnClickUp(): void {
    this.game.camera.y -= 12;
  };
  actionOnClickDown(): void {
    this.game.camera.y += 12;
  };
  CheckStorage(): void {
    if (localStorage.getItem('score') === undefined){
      localStorage.setItem('score', '0');
    }
    else if (localStorage.getItem('highscore') === undefined){
      localStorage.setItem('highscore', '0');
    }
  };


}
