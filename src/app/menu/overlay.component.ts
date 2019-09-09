import {Component, OnInit} from '@angular/core';
import {GamepadComponent} from "@src/app/static/gamepad/gamepad.component";
import {AdsComponent} from "@src/app/static/ads/ads.component";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  constructor() {}

  ngOnInit() {
   AdsComponent.instance.inject('adx');
  }

  public getScore(): number {
    return GamepadComponent.instance.getHighScore()
  }

  public toHome(): void {
    window.document.getElementById('overlayz').style.display = 'none';
    window.document.getElementById('overlayx').style.display = 'none';
    window.document.getElementById('overlayy').style.display = 'none';
  }
}
