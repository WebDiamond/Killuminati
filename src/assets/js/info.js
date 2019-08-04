var InfoState = {
  create: function() {
    this.bi = game.add.audio('buttons');
    this.filtermenu = new Phaser.Filter(game, null, game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    game.add.text(50, 160, 'Il seguente gioco è basato sul nervoso', {font: '20px Helvetica', fill: '#000000' });
    this.jj = game.add.sprite(90, 330, 'refreshbutton');
    this.jj.inputEnabled = true;
	},
	update: function() {
	  this.filtermenu.update();
	  this.jj.events.onInputDown.add(this.onDownJustARefresh, this);
	},
  onDownJustARefresh: function() {
	  this.bi.play();
	  game.state.start('Menu');
	}
};
