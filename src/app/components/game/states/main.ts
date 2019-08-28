import * as Phaser from 'phaser-ce'

export default class GameState extends Phaser.State {
  public game: Phaser.Game;
  public bulletTime: number = 0;
  public total: number = 0;
  public elapsedTime: number = 0; // TODO: prevent this number to turn negative
  public score: number = 0;
  public filter: any;
  public gameoversound;
  public firebulletsound;
  public hitenemysound;
  public required;
  public timer;
  public gem;
  public bullets;
  public shurikensone;
  public shurikenstwo;
  public cadooceadis;
  public scarabs;
  public loominadis;
  public bombs;
  public bullet;

  create(): void {
    localStorage.setItem('last','0');
    window.document.getElementById('particles').style.display='none';
    window.document.getElementById('gamepanel').style.display='block';
    window.document.getElementById('navbarjoypad').style.display='block';
    window.document.getElementById('firebutton').style.display='block';
    window.document.getElementById('menubuttons').style.display='none';
    this.CheckStorage();
    this.gameoversound = this.game.add.audio('gameover');
    this.firebulletsound = this.game.add.audio('bulletload');
    this.hitenemysound = this.game.add.audio('hitenemy');
    this.required = 10 + Math.round(5 * Math.random());
    localStorage.setItem('required',String(this.required));
    this.elapsedTime = 10 + Math.round(5 * Math.random());
    localStorage.setItem('elapsedtime',String(this.elapsedTime));
    this.game.world.setBounds(-1, -1, 3500, 3500);
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.updateTime, this);
    this.timer.start();
    this.generateLevel(Math.floor(Math.random() * 11));
    this.gem = this.game.add.sprite(60, 250, 'gem');
    this.game.physics.enable(this.gem, Phaser.Physics.ARCADE);
    this.gem.fixedToCamera = true;
    this.generateEnemyGroup(Math.round(9 * Math.random()));
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < 5; i++) {
      const b = this.bullets.create(0, 0, 'bullet');
      b.name = 'bullet' + i;
      b.exists = false;
      b.visible = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add(this.resetBullet, this);
    }
  }

  update(): void {
    this.checkAttackLS();
    this.filter.update();
    this.game.camera.x += 2;
    this.game.camera.y += 1.5;
    this.game.world.wrap(this.gem, 0, true);
    this.shurikensone.angle += 0.3;
    this.shurikenstwo.angle += 0.3;
    this.game.physics.arcade.overlap(this.bullets, this.loominadis, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.cadooceadis, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.scarabs, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.gem, this.bombs, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.gem, this.shurikensone, this.GlobalCollisionHandler, null, this);
    this.game.physics.arcade.overlap(this.gem, this.shurikenstwo, this.GlobalCollisionHandler, null, this);
    if (this.elapsedTime === this.total){
      this.timer.stop();
      this.total = 0;
      localStorage.setItem('total', String(this.total));
      if (this.score > Number(localStorage.getItem('highscore')) || undefined) {
        localStorage.setItem('highscore', String(this.score));
        localStorage.setItem('score', String(this.score));
      }
      else if (this.score <= Number(localStorage.getItem('highscore'))) {
        localStorage.setItem('score', String(this.score));
      }
      this.gameoversound.play();
      this.game.state.start("GameOver");
      this.score = 0;
    }
    if (this.required <= 0) {
      this.total = 0;
      localStorage.setItem('total', String(this.total));
      this.score++;
      localStorage.setItem('score', String(this.score));
      this.game.state.start('Main');
    }
  }


  generateLevel(gnum: number) {
    if (gnum === 0) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('bacteria'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 1) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 2) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 3) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 4) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 5) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 6) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 7) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 8) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);
    }
    else if (gnum === 9) {
      this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
      this.filter.addToWorld(-1, -1, 3000, 3000);    }
  }

  generateCustomGroupEnemy(name: string, numlimit: number, kind: string){
    if (kind === 'cadooceadi') {
      this.cadooceadis = this.game.add.group();
      this.cadooceadis.enableBody = true;
      this.cadooceadis.physicsBodyType = Phaser.Physics.ARCADE;
    }
    else if (kind === 'scarab') {
      this.scarabs = this.game.add.group();
      this.scarabs.enableBody = true;
      this.scarabs.physicsBodyType = Phaser.Physics.ARCADE;
    }
    else if(kind === 'loominadi') {
      this.loominadis = this.game.add.group();
      this.loominadis.physicsBodyType = Phaser.Physics.ARCADE;
      this.loominadis.enableBody = true;
    }
    for (let i = 0; i < numlimit; i++) {
      if (kind === 'cadooceadi') {
        var x = this.cadooceadis.create(this.game.world.randomX, Math.random() * 2000, name);
        x.name = kind + i;
      }
      else if(kind === 'scarab') {
        var x = this.scarabs.create(this.game.world.randomX, Math.random() * 2000, name);
        x.name = kind + i;
      }
      else if(kind === 'loominadi') {
        var x = this.loominadis.create(this.game.world.randomX, Math.random() * 2000, name);
        x.name = kind + i;
      }
      if ((x.body.x < this.gem.body.x) && ((x.body.y > this.gem.body.y)
        ||(x.body.y < this.gem.body.y)))
        x.kill();
      x.body.velocity.x = 30 + Math.random() * Math.random() + i * Math.random();
      x.body.velocity.y = 30 + Math.random() * Math.random() + i * Math.random();
      if(kind === 'loominadi') {
        x.animations.add('eyemove');
        x.animations.play('eyemove', 10, true);
      }
    }
  }
  generateCustomGroupEnemyElements(numlimit: number) {
    this.bombs = this.game.add.group();
    this.shurikensone = this.game.add.group();
    this.shurikenstwo = this.game.add.group();
    this.bombs.enableBody = true;
    this.shurikensone.enableBody = true;
    this.shurikenstwo.enableBody = true;
    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    this.shurikensone.physicsBodyType = Phaser.Physics.ARCADE;
    this.shurikenstwo.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < numlimit; i++) {
      const x = this.bombs.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'bombs');
      if ((x.body.x < this.gem.body.x && x.body.y > this.gem.body.y)
        || (x.body.x <= ( this.gem.body.x || 200 + this.gem.body.x) && x.body.y <= this.gem.body.y ))
        x.kill();
      const y = this.shurikenstwo.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'shurikenstwo');
      if ((y.body.x < this.gem.body.x && y.body.y > this.gem.body.y)
        || (y.body.x <= this.gem.body.x && y.body.y <= this.gem.body.y )
        || (y.body.x < 250 + this.gem.body.x && y.body.y === this.gem.body.y )
        || (y.body.x === this.gem.body.x && y.body.y < 200 + this.gem.body.y ))
        y.kill();
      y.anchor.setTo(0.5, 0.5);
      y.body.velocity.y = 50 + Math.random();
      const z = this.shurikensone.create(300 + this.game.world.randomX, 300 + Math.random() * 2000, 'shurikensone');
      if ((z.body.x < this.gem.body.x && z.body.y > this.gem.body.y)
        || (z.body.x <= this.gem.body.x && z.body.y <= this.gem.body.y)
        || (z.body.x < 250 + this.gem.body.x && z.body.y === this.gem.body.y)
        || (z.body.x === this.gem.body.x && z.body.y < 200 + this.gem.body.y))
        z.kill();
      z.anchor.setTo(0.5, 0.5);
      z.body.velocity.y = 50 + Math.random();
    }
  }

  generateEnemyGroup(anum: number) {
    this.generateCustomGroupEnemyElements(23);

    if (anum === 0) {
      this.generateCustomGroupEnemy('loominadis',250,'loominadi');
      this.generateCustomGroupEnemy('scarabs',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadis',10,'cadooceadi');
    }
    else if (anum === 1) {
      this.generateCustomGroupEnemy('loominadissecond',250,'loominadi');
      this.generateCustomGroupEnemy('scarabssecond',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadissecond',10,'cadooceadi');
    }
    else if (anum === 2) {
      this.generateCustomGroupEnemy('loominadisthird',250,'loominadi');
      this.generateCustomGroupEnemy('scarabsthird',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadisthird',10,'cadooceadi');
    }
    else if (anum === 3) {
      this.generateCustomGroupEnemy('loominadissecond',250,'loominadi');
      this.generateCustomGroupEnemy('scarabs',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadis',10,'cadooceadi');
    }
    else if (anum === 4) {
      this.generateCustomGroupEnemy('loominadisfifth',250,'loominadi');
      this.generateCustomGroupEnemy('scarabssecond',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadissecond',10,'cadooceadi');
    }
    else if (anum === 5) {
      this.generateCustomGroupEnemy('loominadissixth',250,'loominadi');
      this.generateCustomGroupEnemy('scarabsthird',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadisthird',10,'cadooceadi');
    }
    else if (anum === 6) {
      this.generateCustomGroupEnemy('loominadisseventh',250,'loominadi');
      this.generateCustomGroupEnemy('scarabs',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadis',10,'cadooceadi');
    }
    else if (anum === 7) {
      this.generateCustomGroupEnemy('loominadiseight',250,'loominadi');
      this.generateCustomGroupEnemy('scarabssecond',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadissecond',10,'cadooceadi');
    }
    else if (anum === 8) {
      this.generateCustomGroupEnemy('loominadisninth', 250, 'loominadi');
      this.generateCustomGroupEnemy('scarabsthird', 5,'scarab');
      this.generateCustomGroupEnemy('cadooceadisthird',10, 'cadooceadi');
    }
    else if (anum === 9) {
      this.generateCustomGroupEnemy('loominadistenth',250,'loominadi');
      this.generateCustomGroupEnemy('scarabs',5,'scarab');
      this.generateCustomGroupEnemy('cadooceadis',10,'cadooceadi');
    }
  }

  updateTime() {
    this.total++;
    localStorage.setItem('total',''+this.total);
  }

  resetBullet(bullet) {
    bullet.kill();
  }



  GlobalCollisionHandler(hitter, hitted: Phaser.Sprite) {
    this.game.add.sprite(hitted.body.x, hitted.body.y,'explosion');
    hitted.kill();
    this.hitenemysound.play();

    if (hitted.name.startsWith('cadooceadi')) {
      hitter.kill();
      this.required -= 3;
      localStorage.setItem('required', String(this.required))
    } else if (hitted.name.startsWith('loominadi')) {
      hitter.kill();
      this.required --;
      localStorage.setItem('required', String(this.required));
    } else if (hitted.name.startsWith('scarab')) {
      hitter.kill();
      this.total -= 5;
      localStorage.setItem('total', String(this.total));
    } else {
      this.elapsedTime = this.total;
      localStorage.setItem('elapsedtime',''+this.elapsedTime);
      localStorage.setItem('score', ''+this.score);
    }
  }

  fireBullet() {
    this.firebulletsound.play();
    if (this.game.time.now > this.bulletTime){
      this.bullet = this.bullets.getFirstExists(false);
      if (this.bullet) {
        this.bullet.reset(this.gem.x, this.gem.y);
        this.bullet.body.velocity.x = 1000;
        this.bulletTime = this.game.time.now + 0.5;
      }
    }
  }
  actionOnClickAtk() {
    this.fireBullet();
  }

  checkAttackLS () {
    if (localStorage.getItem('ctrl_dwn') === '1') {
      this.game.camera.y += 12;
      localStorage.setItem('ctrl_dwn', '0')
    }
    if (localStorage.getItem('ctrl_up') === '1') {
      this.game.camera.y -= 12;
      localStorage.setItem('ctrl_up', '0')
    }
    if (localStorage.getItem('ctrl_fire') === '1') {
      this.actionOnClickAtk();
      localStorage.setItem('ctrl_fire', '0')
    }
  }

  CheckStorage() {
    localStorage.setItem('last', '0');
    if (localStorage.getItem('score') === undefined) {
      localStorage.setItem('score', '0');
    }
    else if (localStorage.getItem('highscore') === undefined) {
      localStorage.setItem('highscore', '0');
    }
  }
}