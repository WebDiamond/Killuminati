import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  private adsComponent: HTMLIFrameElement;
  constructor() { }

  ngOnInit() {
    this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    this.adsComponent.style.border = "0px";
    this.adsComponent.style.padding = "0";
    this.adsComponent.style.overflow = "hidden";
    window.document.getElementById('ad').appendChild(this.adsComponent);
  }

}
