import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  constructor() {
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

