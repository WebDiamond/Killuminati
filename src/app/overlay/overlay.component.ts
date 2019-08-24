import {Component, OnInit} from '@angular/core';

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
    this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    this.adsComponent.style.border = "0px";
    window.document.getElementById('ad').appendChild(this.adsComponent);

  }
  getScore() {
    return localStorage.getItem('highscore');
  }
  toHome() {
    window.document.getElementById('overlayz').style.display = 'none';
    window.document.getElementById('overlayx').style.display = 'none';
    window.document.getElementById('overlayy').style.display = 'none';
  }
}

