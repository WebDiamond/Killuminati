import * as Phaser from 'phaser-ce'

export default class GameOverState extends Phaser.State {
  public filter: any;
  public game: Phaser.Game;

  create() {
    window.document.getElementById('particles').style.display='block';
    window.document.getElementById('gamepanel').style.display='none';
    window.document.getElementById('navbarjoypad').style.display='none';
    window.document.getElementById('firebutton').style.display='none';
    window.document.getElementById('returnbutton').style.display='block';
    this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
    this.filter.addToWorld(-1, -1,3000,3000);
    localStorage.setItem('last',''+localStorage.getItem('score'));
    if (Number(localStorage.getItem('score')) > Number(localStorage.getItem('highscore'))){
      localStorage.setItem('highscore',''+localStorage.getItem('score'));
    }
    else localStorage.setItem('score','0');

  }
  update(): void {
    this.filter.update();
  }
}
