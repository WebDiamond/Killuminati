import * as Phaser from 'phaser-ce'

export default class GameOverState extends Phaser.State {
  public filtermenu;
  public buttonsoundforgameover;
  public refreshbutton;
  public game: Phaser.Game;

  create() {
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('returnbutton').style.display='block';
    this.filtermenu = new Phaser.Filter(this.game, null, this.game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    this.game.add.sprite(50, 160, 'gameoverwrite');
    this.buttonsoundforgameover = this.game.add.audio('buttons');
    this.refreshbutton = this.game.add.sprite(90, 330, 'refreshbutton');
    this.refreshbutton.inputEnabled = true;
    this.game.add.text(70, 250, 'Punteggio:' + localStorage.getItem('last'), {font: '20px Arial', fill: '#000000'});
  }
  update(): void {
    this.filtermenu.update();
    this.refreshbutton.events.onInputDown.add(this.onDownRefresh, this);
  }
  onDownRefresh(): void {
    this.buttonsoundforgameover.play();
    window.document.getElementById('returnbutton').style.display='none';
    this.game.state.start('Menu');
  }
}
