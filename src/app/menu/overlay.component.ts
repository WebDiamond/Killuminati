import {Component, OnInit} from '@angular/core';
import {GamepadComponent} from "@src/app/static/gamepad/gamepad.component";
import {AdsComponent} from "@src/app/static/ads/ads.component";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  public adsComponent: HTMLIFrameElement;
  constructor() {
  }
  ngOnInit() {
   /* this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    window.document.getElementById('adx').appendChild(this.adsComponent);*/
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
