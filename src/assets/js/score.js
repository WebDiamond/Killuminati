var ScoreState = {
	create: function(){
    this.filtermenu = new Phaser.Filter(game, null, game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    this.orb = game.add.sprite(90, 330, 'refreshbutton');
    this.orb.inputEnabled = true;
    game.add.sprite(50,160, 'scorelabel');
    game.add.text(50, 200, 'Punteggio:'+localStorage.getItem("highscore"), {font: '20px Arial', fill: '#000000' });
    },
  update: function(){
	  this.filtermenu.update();
	  this.orb.events.onInputDown.add(this.onDownRefresh, this);
	  },
  onDownRefresh: function() {
	  game.add.audio('buttons').play();
	  game.state.start('Menu');
	}
};
