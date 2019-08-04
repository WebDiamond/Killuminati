var bulletTime = 0;
var total = 0;
if (score === null || score === undefined){
var score = 0;
}
var filter;
var MainState = {
	create: function() {
    filter = new Phaser.Filter(game, null, game.cache.getShader('bacteria'));
    CheckStorage();
		gameoversound = game.add.audio('gameover');
		firebulletsound = game.add.audio('bulletload');
		hitenemysound = game.add.audio('hitenemy');
		required = 10 + Math.round(5*Math.random());
		elapsedTime = 10 + Math.round(5*Math.random());
		game.world.setBounds(-1,-1, 3500,3500);
		timer = game.time.create(false);
		timer.loop(1000, updateTime, this);
		timer.start();
		generateLevel(0);
		gem = game.add.sprite(120, 250, 'gem');
		game.physics.enable(gem, Phaser.Physics.ARCADE);
		gem.fixedToCamera = true;
		generateEnemyGroup(Math.round(9*Math.random()));
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		for (var i = 0; i < 5; i++){
			var b = bullets.create(0, 0, 'bullet');
			b.name = 'bullet' + i;
			b.exists = false;
			b.visible = false;
			b.checkWorldBounds = true;
			b.events.onOutOfBounds.add(resetBullet, this);
		}
		cmd = game.add.sprite(0, 480, 'cmd');
		cmd.fixedToCamera = true;
		buttonone = game.add.button(250, 480, 'atkbutton', actionOnClickAtk, this, 2, 1, 0);
		buttonone.fixedToCamera = true;
		buttonup = game.add.button(50, 480, 'upbutton', actionOnClickUp, this, 2, 1, 0);
		buttonup.fixedToCamera = true;
		buttondown = game.add.button(150, 480, 'downbutton', actionOnClickDown, this, 2, 1, 0);
		buttondown.fixedToCamera = true;
		requiredico = game.add.sprite(15, 10, 'pointlabel');
		requiredico.fixedToCamera = true;
		timerico = game.add.sprite(100, 10, 'timerlabel');
		timerico.fixedToCamera = true;
		failico = game.add.sprite(100, 64, 'faillabel');
		failico.fixedToCamera = true;
		scoreico = game.add.sprite(15, 64, 'scorelabel');
		scoreico.fixedToCamera = true;
	},
	update: function() {
	  filter.update();
    game.camera.x += 2;
		game.camera.y += 1.5;
		game.world.wrap(gem, 0, true);
		shurikensone.angle += 0.3;
		shurikenstwo.angle += 0.3;
		game.physics.arcade.overlap(bullets, loominadis, GlobalCollisionHandler, null, this);
		game.physics.arcade.overlap(bullets, cadooceadis, GlobalCollisionHandlerSecond, null, this);
		game.physics.arcade.overlap(bullets, scarabs, GlobalCollisionHandlerThird, null, this);
		game.physics.arcade.overlap(gem, bombs, AnotherCollisionHandler, null, this);
		game.physics.arcade.overlap(gem, shurikensone, AnotherCollisionHandler, null, this);
		game.physics.arcade.overlap(gem, shurikenstwo, AnotherCollisionHandler, null, this);
		if (elapsedTime === total){
			timer.stop();
			total = 0;
			if (score > localStorage.getItem('highscore')){
				localStorage.setItem('highscore', score);
				localStorage.setItem('last', score);
				score = 0;
			}
			else if (score <= localStorage.getItem('highscore')) {
				localStorage.setItem("last", score);
				score = 0;
			}
			gameoversound.play();
			game.state.start("GameOver");
		}
		if (required <= 0){
			total = 0;
			score++
			game.state.start('Main');
		}
	},
	render: function() {
		game.debug.text('     '+required, 20, 32);
		game.debug.text('     '+total, 120, 32);
		game.debug.text('     '+elapsedTime, 120, 86);
		game.debug.text('     '+score, 20, 86);
	}
};
function generateLevel(gnum) {
	if (gnum === 0){
   this.filter.addToWorld(-1, -1, 3000, 3000);
		//game.add.sprite(-1, -1, 'background');
	}
	else if (gnum === 1){
		game.add.sprite(-1, -1, 'backgroundsecond');
	}
	else if (gnum === 2){
		game.add.sprite(-1, -1, 'backgroundthird');
	}
	else if (gnum === 3){
		game.add.sprite(-1, -1, 'backgroundfourth');
	}
	else if (gnum === 4){
		game.add.sprite(-1, -1, 'backgroundfifth');
	}
	else if (gnum === 5){
		game.add.sprite(-1, -1, 'backgroundsixth');
	}
	else if (gnum === 6){
		game.add.sprite(-1, -1, 'backgroundseventh');
	}
	else if (gnum === 7){
		game.add.sprite(-1, -1, 'backgroundeight');
	}
	else if (gnum === 8){
		game.add.sprite(-1, -1, 'backgroundninth');
	}
	else if (gnum === 9){
		game.add.sprite(-1, -1, 'backgroundtenth');
	}
};
function generateCustomGroupEnemy(name, numlimit, kind){
	if (kind === 'cadooceadi'){
		cadooceadis = game.add.group();
		cadooceadis.enableBody = true;
		cadooceadis.physicsBodyType = Phaser.Physics.ARCADE;
	}
	else if (kind === 'scarab'){
		scarabs = game.add.group();
		scarabs.enableBody = true;
		scarabs.physicsBodyType = Phaser.Physics.ARCADE;
	}
	else if(kind === 'loominadi'){
		loominadis = game.add.group();
		loominadis.physicsBodyType = Phaser.Physics.ARCADE;
		loominadis.enableBody = true;
	}
	for (var i = 0; i < numlimit; i++){
		if (kind === 'cadooceadi'){
			var x = cadooceadis.create(game.world.randomX, Math.random() * 2000, name);
			x.name = kind + i;
		}
		else if (kind === 'scarab'){
			var x = scarabs.create(game.world.randomX, Math.random() * 2000, name);
			x.name = kind + i;
		}
		else if(kind === 'loominadi'){
			var x = loominadis.create(game.world.randomX, Math.random() * 2000, name);
			x.name = kind + i;
		}
		if ((x.body.x < gem.body.x) & ((x.body.y > gem.body.y)
			||(x.body.y < gem.body.y)))
			x.kill();
		x.body.velocity.x = 30 + Math.random() * Math.random() + i * Math.random();
		x.body.velocity.y = 30 + Math.random() * Math.random() + i * Math.random();
		if(kind === 'loominadi'){
			x.animations.add('eyemove');
			x.animations.play('eyemove', 10, true);
		}

	}

}
function generateCustomGroupEnemyElements(numlimit){
	bombs = game.add.group();
	shurikensone = game.add.group();
	shurikenstwo = game.add.group();
	bombs.enableBody = true;
	shurikensone.enableBody = true;
	shurikenstwo.enableBody = true;
	bombs.physicsBodyType = Phaser.Physics.ARCADE;
	shurikensone.physicsBodyType = Phaser.Physics.ARCADE;
	shurikenstwo.physicsBodyType = Phaser.Physics.ARCADE;
	for (var i = 0; i < numlimit; i++){
		var x = bombs.create(300 + game.world.randomX, 300 + Math.random() * 2000, 'bombs');
		if ((x.body.x < gem.body.x & x.body.y > gem.body.y)
			|| (x.body.x <= ( gem.body.x || 200 + gem.body.x) & x.body.y <= gem.body.y ))
			x.kill();
		var y = shurikenstwo.create(300 + game.world.randomX, 300 + Math.random() * 2000, 'shurikenstwo');
		if ((y.body.x < gem.body.x & y.body.y > gem.body.y)
			|| (y.body.x <= gem.body.x & y.body.y <= gem.body.y )
			|| (y.body.x < 250 + gem.body.x & y.body.y === gem.body.y )
			|| (y.body.x === gem.body.x & y.body.y < 200 + gem.body.y ))
			y.kill();
		y.anchor.setTo(0.5, 0.5);
		y.body.velocity.y = 50 + Math.random();
		var z = shurikensone.create(300 + game.world.randomX, 300 + Math.random() * 2000, 'shurikensone');
		if ((z.body.x<gem.body.x&z.body.y>gem.body.y)
			||(z.body.x<=gem.body.x&z.body.y<=gem.body.y)
			||(z.body.x < 250 + gem.body.x & z.body.y === gem.body.y)
			||(z.body.x === gem.body.x & z.body.y < 200 + gem.body.y))
			z.kill();
		z.anchor.setTo(0.5, 0.5);
		z.body.velocity.y = 50 + Math.random();
	}
};
function generateEnemyGroup(anum) {
	generateCustomGroupEnemyElements(23);
	if (anum === 0){
		generateCustomGroupEnemy('loominadis','250','loominadi');
		generateCustomGroupEnemy('scarabs','5','scarab');
		generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
	}
	else if (anum === 1){
		generateCustomGroupEnemy('loominadissecond','250','loominadi');
		generateCustomGroupEnemy('scarabssecond','5','scarab');
		generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
	}
	else if (anum === 2){
		generateCustomGroupEnemy('loominadisthird','250','loominadi');
		generateCustomGroupEnemy('scarabsthird','5','scarab');
		generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
	}
	else if (anum === 3){
		generateCustomGroupEnemy('loominadissecond','250','loominadi');
		generateCustomGroupEnemy('scarabs','5','scarab');
		generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
	}
	else if (anum === 4){
		generateCustomGroupEnemy('loominadisfifth','250','loominadi');
		generateCustomGroupEnemy('scarabssecond','5','scarab');
		generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
	}
	else if (anum === 5){
		generateCustomGroupEnemy('loominadissixth','250','loominadi');
		generateCustomGroupEnemy('scarabsthird','5','scarab');
		generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
	}
	else if (anum === 6) {
		generateCustomGroupEnemy('loominadisseventh','250','loominadi');
		generateCustomGroupEnemy('scarabs','5','scarab');
		generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
	}
	else if (anum === 7){
		generateCustomGroupEnemy('loominadiseight','250','loominadi');
		generateCustomGroupEnemy('scarabssecond','5','scarab');
		generateCustomGroupEnemy('cadooceadissecond','10','cadooceadi');
	}
	else if (anum === 8){
		generateCustomGroupEnemy('loominadisninth','250','loominadi');
		generateCustomGroupEnemy('scarabsthird','5','scarab');
		generateCustomGroupEnemy('cadooceadisthird','10','cadooceadi');
	}
	else if (anum === 9){
		generateCustomGroupEnemy('loominadistenth','250','loominadi');
		generateCustomGroupEnemy('scarabs','5','scarab');
		generateCustomGroupEnemy('cadooceadis','10','cadooceadi');
	}
};
function updateTime(){
	total++
};
function resetBullet(bullet) {
	bullet.kill();
};
function GlobalCollisionHandler(bullet, loominadi){
	game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
	bullet.kill();
	loominadi.kill();
	required--
	hitenemysound.play();
};
function GlobalCollisionHandlerSecond(bullet, cadooceadi){
	game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
	bullet.kill();
	cadooceadi.kill();
	required -= 3;
	hitenemysound.play();
};
function GlobalCollisionHandlerThird(bullet, scarab){
	game.add.sprite(bullet.body.x, bullet.body.y, 'explosion');
	bullet.kill();
	scarab.kill();
	total -= 5;
	hitenemysound.play();
};
function AnotherCollisionHandler(gem, bomb){
	game.add.sprite(bomb.body.x, bomb.body.y,'explosion');
	bomb.kill();
	elapsedTime = total;
	hitenemysound.play();
};
function fireBullet() {
	firebulletsound.play();
	if (game.time.now > bulletTime){
		bullet = bullets.getFirstExists(false);
		if (bullet){
			bullet.reset(gem.x, gem.y);
			bullet.body.velocity.x = 1000;
			bulletTime = game.time.now + 0.5;
		}
	}
};
function actionOnClickAtk() {
	fireBullet();
};
function actionOnClickUp() {
	game.camera.y -= 12;
};  
function actionOnClickDown() {
	game.camera.y += 12;
};
function CheckStorage() {
	if (localStorage.getItem('score') === undefined){
		localStorage.setItem('score', 0);
    }
	else if (localStorage.getItem('highscore') === undefined){
		localStorage.setItem('highscore', 0);
    }
};
