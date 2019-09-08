import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  public static instance;
  public adsComponent: HTMLIFrameElement;
  constructor() {
    AdsComponent.instance = this
  }
  ngOnInit(): void {
  }

  public inject(n: string): void{
    this.adsComponent = window.document.createElement("iframe");
    this.adsComponent.setAttribute("src", "https://ad.a-ads.com/1221941?size=120x90");
    this.adsComponent.style.width = "120px";
    this.adsComponent.style.height = "90px";
    window.document.getElementById(n).appendChild(this.adsComponent);
  }

}
