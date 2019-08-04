import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'killuminatipwa';
  gameScripts = ["boot.js","credit.js","gameover.js","info.js","main.js","menu.js","score.js"];
  private gameScriptComponent: HTMLScriptElement;
  constructor(private http: HttpClient){

  }
  ngOnInit() {
    for(let i = 0; i < this.gameScripts.length; i++) {
      let game = this.http.get('assets/js/' + this.gameScripts[i], {responseType: 'text'}).subscribe(data => {
        this.gameScriptComponent = window.document.createElement("script")
        this.gameScriptComponent.innerHTML = data
        window.document.getElementById('game').appendChild(this.gameScriptComponent)
      })
    }
  }
}
