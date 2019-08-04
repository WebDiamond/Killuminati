var CreditState = {
	create: function() {
	  this.buttonsoundforcredit = game.add.audio('buttons');
    this.filtermenu = new Phaser.Filter(game, null, game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    game.add.text(50, 160, 'Ti piace questo gioco?',  {font: '20px Helvetica', fill: '#000000' });
    this.dd = game.add.sprite(90, 330, 'refreshbutton');
    this.dd.inputEnabled = true;
	},
	update: function() {
	  this.filtermenu.update();
	  this.dd.events.onInputDown.add(this.onDownAnotherRefresh, this);
	},
  onDownAnotherRefresh: function() {
	  this.buttonsoundforcredit.play();
	  game.state.start('Menu');
	}
};
