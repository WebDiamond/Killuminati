import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  public getCurrentTime(i: number): void {
    console.log(i);
  }

  public getCurrentPoint(i: number): void {
    console.log(i);
  }

  public getRequiredTime(i: number): void {
    console.log(i);
  }

  public getCurrentScore(i: number): void {
    console.log(i);
  }

  public getGameOverScore(i: number): void {
    console.log(i);
  }

  public startGame(){
  }

  public loadGameOver(){
  }

  public showOverlayX() : void {
    window.document.getElementById('overlayz').style.display='block';
  }

  public showOverlayY() {
    window.document.getElementById('overlayx').style.display='block';
  }

  public showOverlayZ() {
    window.document.getElementById('overlayy').style.display='block';
  }
}
