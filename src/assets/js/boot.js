
var BootState = {
	preload: function() {
	  var godly = 'http://localhost:4200';
    game.load.shader('menu', godly+'/assets/assets/menu.frag');
    game.load.shader('bacteria', godly+'/assets/assets/bacteria.frag');
		game.load.audio('buttons', godly+'/assets/sounds/button.mp3');
		game.load.audio('hitenemy', godly+'/assets/sounds/enemyhit.mp3');
		game.load.audio('bulletload', godly+'/assets/sounds/firebullet.mp3');
		game.load.audio('gameover', godly+'/assets/sounds/gameoversound.mp3');
		game.load.image('recordbutton', godly+'/assets/buttons/recordbtn.png');
		game.load.image('creditbutton', godly+'/assets/buttons/creditbtn.png');
		game.load.image('infobutton', godly+'/assets/buttons/infobtn.png');
		game.load.image('refreshbutton', godly+'/assets/buttons/refresh.png');
		game.load.image('startbutton', godly+'/assets/buttons/startbtn.png');
		game.load.image('killuminatiwrite', godly+'/assets/backgrounds/killuminatiwr.png');
		game.load.image('gameoverwrite', godly+'/assets/backgrounds/gameoverwr.png');
		game.load.image('background', godly+'/assets/backgrounds/background.png');
		game.load.image('backgroundsecond', godly+'/assets/backgrounds/background2.png');
		game.load.image('backgroundthird', godly+'/assets/backgrounds/background3.png');
		game.load.image('backgroundfourth', godly+'/assets/backgrounds/background4.png');
		game.load.image('backgroundfifth', godly+'/assets/backgrounds/background5.png');
		game.load.image('backgroundsixth', godly+'/assets/backgrounds/background6.png');
		game.load.image('backgroundseventh', godly+'/assets/backgrounds/background7.png');
		game.load.image('backgroundeight', godly+'/assets/backgrounds/background8.png');
		game.load.image('backgroundninth', godly+'/assets/backgrounds/background9.png');
		game.load.image('backgroundtenth', godly+'/assets/backgrounds/background10.png');
		game.load.image('sfondomenu', godly+'/assets/backgrounds/sfondomenu.png');
		game.load.image('cmd', godly+'/assets/interface/cmdbar.png');
		game.load.image('atkbutton', godly+'/assets/interface/atkbtn.png');
		game.load.image('upbutton', godly+'/assets/interface/up.png');
		game.load.image('downbutton', godly+'/assets/interface/down.png');
		game.load.image('gem', godly+'/assets/interface/ii.png');
		game.load.image('bullet', godly+'/assets/interface/bullet.png');
		game.load.image('pointlabel', godly+'/assets/interface/pointimg.png');
		game.load.image('timerlabel', godly+'/assets/interface/timerimg.png');
		game.load.image('faillabel', godly+'/assets/interface/failimg.png');
		game.load.image('scorelabel', godly+'/assets/interface/scorecrystal.png');
		game.load.image('explosion', godly+'/assets/interface/explosionimg.png');
		game.load.image('bombs', godly+'/assets/assets/bomb.png');
		game.load.image('shurikensone', godly+'/assets/assets/shuriken1.png');
		game.load.image('shurikenstwo', godly+'/assets/assets/shuriken2.png');
		game.load.image('scarabs', godly+'/assets/assets/scarab1.png');
		game.load.image('scarabssecond', godly+'/assets/assets/scarab2.png');
		game.load.image('scarabsthird', godly+'/assets/assets/scarab3.png');
		game.load.image('cadooceadis', godly+'/assets/assets/cadooceadis1.png');
		game.load.image('cadooceadissecond', godly+'/assets/assets/cadooceadis2.png');
		game.load.image('cadooceadisthird', godly+'/assets/assets/cadooceadis3.png');
		game.load.spritesheet('loominadis', godly+'/assets/assets/loominadi1.png', 116, 103, 5);
		game.load.spritesheet('loominadissecond', godly+'/assets/assets/loominadi2.png', 116, 103, 5);
		game.load.spritesheet('loominadisthird', godly+'/assets/assets/loominadi3.png', 116, 103, 5);
		game.load.spritesheet('loominadisfourth', godly+'/assets/assets/loominadi4.png', 116, 103, 5);
		game.load.spritesheet('loominadisfifth', godly+'/assets/assets/loominadi5.png', 116, 103, 5);
		game.load.spritesheet('loominadissixth', godly+'/assets/assets/loominadi6.png', 116, 103, 5);
		game.load.spritesheet('loominadisseventh', godly+'/assets/assets/loominadi7.png', 116, 103, 5);
		game.load.spritesheet('loominadiseight', godly+'/assets/assets/loominadi8.png', 116, 103, 5);
		game.load.spritesheet('loominadisninth', godly+'/assets/assets/loominadi9.png', 116, 103, 5);
		game.load.spritesheet('loominadistenth', godly+'/assets/assets/loominadi10.png', 116, 103, 5);
        
	},
	 create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start("Menu");
	}
};
