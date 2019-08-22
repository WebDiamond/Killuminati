import * as Phaser from 'phaser-ce'

export default class GameOverState extends Phaser.State {
  public filtermenu;
  public buttonsoundforgameover;
  public game: Phaser.Game;

  create() {
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('firebutton').style.display='none';
    window.document.getElementById('returnbutton').style.display='block';
    this.filtermenu = new Phaser.Filter(this.game, null, this.game.cache.getShader('menu'));
    this.filtermenu.addToWorld(-1, -1, 3000, 3000);
    this.game.add.sprite(50, 160, 'gameoverwrite');
    this.buttonsoundforgameover = this.game.add.audio('buttons');
    this.game.add.text(70, 250, 'Punteggio:' + localStorage.getItem('score'), {font: '20px Arial', fill: '#000000'});
    localStorage.setItem('score', '0')
  }
  update(): void {
    this.filtermenu.update();
  }
}
