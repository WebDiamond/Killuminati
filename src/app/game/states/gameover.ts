import * as Phaser from 'phaser-ce'

export default class GameOverState extends Phaser.State {
  public filtermenu;
  public game: Phaser.Game;

  create() {
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('firebutton').style.display='none';
    window.document.getElementById('returnbutton').style.display='block';
    this.filtermenu = new Phaser.Filter(this.game, null, this.game.cache.getShader('menu'));
    localStorage.setItem('last',''+localStorage.getItem('score'));
    if (Number(localStorage.getItem('score')) > Number(localStorage.getItem('highscore'))){
      localStorage.setItem('highscore',''+localStorage.getItem('score'));
    }
    else localStorage.setItem('score','0');

  }
  update(): void {
    this.filtermenu.update();
  }
}
