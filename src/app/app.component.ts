import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'killuminatipwa';
  constructor(){
  }
  ngOnInit() {
  }

  getScore() {
    return localStorage.getItem('score');
  }

  toHome() {
    window.document.getElementById('overlayz').style.display = 'none';
    window.document.getElementById('overlayx').style.display = 'none';
    window.document.getElementById('overlayy').style.display = 'none';
  }
}
