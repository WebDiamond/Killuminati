var GameOverState = {
    create: function() {
      this.randads = Math.round(5*Math.random());
      if (this.randads === 3){
        //initAppFirst();
	    }
      if (this.randads === 2){
        // initAppSecond();
      }
      this.filtermenu = new Phaser.Filter(game, null, game.cache.getShader('menu'));
      this.filtermenu.addToWorld(-1, -1, 3000, 3000);
      game.add.sprite(50, 160, 'gameoverwrite');
      this.buttonsoundforgameover = game.add.audio('buttons');
      this.refreshbutton = game.add.sprite(90, 330, 'refreshbutton');
      this.refreshbutton.inputEnabled = true;
      game.add.text(70, 250, 'Punteggio:'+localStorage.getItem("last"), {font: '20px Arial', fill: '#000000'});
      },
    update: function() {
      this.filtermenu.update();
      this.refreshbutton.events.onInputDown.add(this.onDownRefresh, this);
      },
    onDownRefresh: function(){
      this.buttonsoundforgameover.play();
      game.state.start('Menu');
    }
};
