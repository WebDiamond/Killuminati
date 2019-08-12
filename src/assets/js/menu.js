var MenuState = {
	create: function() {
    this.buttonmenusound = game.add.audio('buttons');
    this.filtermenu = new Phaser.Filter(game, null, game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    game.add.sprite(50, 160, 'killuminatiwrite');
		this.startbutton = game.add.sprite(50, 250, 'startbutton');
		this.startbutton.inputEnabled = true;
		this.recordbutton = game.add.sprite(50, 330, 'recordbutton');
		this.recordbutton.inputEnabled = true;
		this.endbutton = game.add.sprite(50, 410, 'creditbutton');
		this.endbutton.inputEnabled = true;
		this.infobutton = game.add.sprite(50, 490, 'infobutton');
		this.infobutton.inputEnabled = true;
		},
  update: function() {
	  this.filtermenu.update();
	  this.startbutton.events.onInputDown.add(this.onDownFirst, this);
	  this.recordbutton.events.onInputDown.add(this.onDownRecord, this);
	  this.endbutton.events.onInputDown.add(this.onDownEnd, this);
	  this.infobutton.events.onInputDown.add(this.onDownInfo, this);
	  },
  onDownFirst: function() {
    this.buttonmenusound.play();
    game.state.start('Main');
  },
  onDownRecord: function() {
    this.buttonmenusound.play();
    window.document.getElementById("overlay").style.display = "block";
  },
  onDownEnd: function() {
    this.buttonmenusound.play();
    window.document.getElementById("overlay").style.display = "block";
    },
  onDownInfo: function(){
    this.buttonmenusound.play();
    window.document.getElementById("overlay").style.display = "block";

  }
};
