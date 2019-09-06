import * as Phaser from 'phaser-ce'
import {GamepadComponent} from "@src/app/static/gamepad/gamepad.component";
import {ParticlesComponent} from "@src/app/static/particles/particles.component";

export default class GameOverState extends Phaser.State {
  public filter: any;
  public game: Phaser.Game;

  create() {
    ParticlesComponent.instance.show();
    GamepadComponent.instance.hide();
    window.document.getElementById('returnbutton').style.display='block';
    this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('godly'));
    this.filter.addToWorld(-1, -1,3000,3000);
    localStorage.setItem('last',''+GamepadComponent.instance.getScore());
    if (GamepadComponent.instance.getScore() > Number(localStorage.getItem('highscore'))){
      localStorage.setItem('highscore',''+GamepadComponent.instance.getScore());
    }
    else GamepadComponent.instance.setScore(0);
  }
  update(): void {
    this.filter.update();
  }
}
